import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/view/Home.vue"),
    meta: { requiresAuth: true }, // <-- protected
  },
  {
    name: "auth",
    path: "/auth",
    component: () => import("@/view/Auth.vue"),
    meta: { public: true }, // optional, just for clarity
  },
];

function isAuthed() {
  // dumb example: swap to your real check (Pinia store, cookie, etc.)
  return !!localStorage.getItem("token");
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthed()) {
    return { name: "auth", query: { redirect: to.fullPath } };
  }
  if (to.name === "auth" && isAuthed()) {
    return { path: to.query.redirect || "/" };
  }
  // otherwise allow
});

export default router;
