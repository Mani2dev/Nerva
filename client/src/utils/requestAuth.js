// src/utils/requestAuth.js
import axios from "axios";

// --- axios instance ---
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
  withCredentials: true, // send/receive httpOnly cookies
  headers: { "Content-Type": "application/json" },
});

// --- tiny in-module auth cache to avoid spamming /whoami ---
let _authCache = { ok: false, user: null, ts: 0 };
const AUTH_TTL_MS = 5000;

// --- helpers ---
function parseError(err) {
  const status = err?.response?.status ?? 0;
  const data = err?.response?.data;
  const error =
    data?.detail ||
    data?.message ||  
    data?.error ||
    (status ? `HTTP ${status}` : "Network error");
  return { status, error };
}

export function clearAuthCache() {
  _authCache = { ok: false, user: null, ts: 0 };
}

export function getCachedUser() {
  return _authCache.user;
}

// Optional CSRF helper if you add CSRF cookie/header later
export function getCsrfTokenFromCookie(name = "csrf_token") {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

// --- 401 auto-logout / redirect QoL ---
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      clearAuthCache();
      // Avoid redirect loops if already on auth routes:
      if (!location.pathname.startsWith("/auth")) {
        location.href = "/auth/login";
      }
    }
    return Promise.reject(err);
  }
);

// --- API calls ---

export async function requestLogin(username, password) {
  // Do NOT store tokens in storage; server sets httpOnly cookie
  try {
    const { data, status } = await api.post("/auth/login", { username, password });
    const ok = data?.ok === true;
    if (ok) {
      // warm cache with a whoami round-trip (optional but nice)
      try {
        const who = await requestWhoami(true /* skip cache */);
        if (who.ok) _authCache = { ok: true, user: who.data.user, ts: Date.now() };
      } catch {
        // ignore; cache stays cold
      }
    }
    return { ok, data, status };
  } catch (err) {
    return { ok: false, ...parseError(err) };
  }
}

export async function requestWhoami(skipCache = false) {
  const now = Date.now();
  if (!skipCache && now - _authCache.ts < AUTH_TTL_MS) {
    return { ok: _authCache.ok, data: _authCache.ok ? { ok: true, user: _authCache.user } : null, status: 200 };
  }

  try {
    const { data, status } = await api.get("/auth/whoami");
    const ok = data?.ok === true;
    _authCache = { ok, user: ok ? data.user : null, ts: now };
    return { ok, data, status };
  } catch (err) {
    clearAuthCache();
    return { ok: false, ...parseError(err) };
  }
}

export async function requestLogout() {
  try {
    const { data, status } = await api.post("/auth/logout");
    clearAuthCache();
    return { ok: data?.ok === true, data, status };
  } catch (err) {
    clearAuthCache();
    return { ok: false, ...parseError(err) };
  }
}
