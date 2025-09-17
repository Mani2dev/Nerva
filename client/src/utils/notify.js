// /src/utils/notify.js
export function markNotify(
  id,
  count,
  variant /* 'is-warn' | 'is-crit' | 'is-ok' */
) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("hasNotification");
  if (variant) el.classList.add(variant);

  let badge = el.querySelector(".badge");
  if (typeof count === "number") {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "badge";
      el.appendChild(badge);
    }
    badge.textContent = String(count);
  } else if (badge) {
    badge.remove();
  }
}

export function clearNotify(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(
    "hasNotification",
    "is-warn",
    "is-crit",
    "is-ok",
    "attention-decay"
  );
  el.querySelector(".badge")?.remove();
}

export function decayNotify(id) {
  document.getElementById(id)?.classList.add("attention-decay");
}
