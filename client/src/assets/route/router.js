// router.js
import { createRouter, createWebHistory } from "vue-router";
import { requestWhoami } from "@/utils/requestAuth.js"

let cachedAuth = { ok: false, ts: 0, user: null };
async function checkAuth() {
  const now = Date.now();
  if (now - cachedAuth.ts < 5000) return cachedAuth.ok; // 5s soft cache
  const res = await requestWhoami();
  cachedAuth = { ok: !!(res.ok && res.data?.ok), ts: now, user: res.data?.user || null };
  return cachedAuth.ok;
}

const routes = [
  {
    path: "/auth",
    children: [
      { path: "", redirect: "/auth/login" }, // <— THIS fixes /auth blank page
      {
        path: "login",
        component: () => import("@/pages/auth/Auth.vue"),
        meta: { chrome: false },
      },
      {
        path: "forgot",
        component: () => import("@/pages/auth/Forgot.vue"),
        meta: { chrome: false },
      },
    ],
  },
  {
    path: "/",
    children: [
      { path: "", redirect: "/dashboard" },
      { path: "dashboard", component: () => import("@/pages/Dashboard.vue") },
      { path: "honeypots", component: () => import("@/pages/Honeypots.vue") },
      { path: "traffic", component: () => import("@/pages/Traffic.vue") },
      { path: "logs", component: () => import("@/pages/Logs.vue") },
      { path: "incidents", component: () => import("@/pages/Incidents.vue") },
      { path: "phishing", component: () => import("@/pages/Phishing.vue") },
      { path: "health", component: () => import("@/pages/Health.vue") },
      { path: "intel", component: () => import("@/pages/ThreatIntel.vue") },
      { path: "rules", component: () => import("@/pages/Rules.vue") },
      { path: "playbooks", component: () => import("@/pages/Playbooks.vue") },
      { path: "reports", component: () => import("@/pages/Reports.vue") },
      { path: "settings", component: () => import("@/pages/Settings.vue") },
      { path: ":pathMatch(.*)*", redirect: "/dashboard" },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, _from, next) => {
  const needsAuth = !to.matched.some((r) => r.meta.chrome === false);
  if (!needsAuth) {
    if (to.path.startsWith("/auth") && await checkAuth()) return next("/dashboard");
    return next();
  }
  if (await checkAuth()) return next();
  next("/auth/login");
});

export default router;
