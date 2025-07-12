import { createWebHistory , createRouter } from "vue-router";
import Index from "../../views/Index.vue";

const routes = [
  { 
    path: "/", 
    name: 'Index',
    component: Index,
    meta: { requiresAuth: true }
  },
   {
    path: "/auth",
    name: "Auth",
    component: () => import("../../views/Auth.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../../views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory (),
  routes,
});


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  const t = localStorage.getItem('token')
  if(requiresAuth && !t) {
    next({name: 'Auth'})
  }
  else {
    next()
  }

})



export default router;
