import { createRouter, createWebHistory } from "vue-router";
import { userManager } from "@/auth/userManager";

import CallbackView from "@/views/CallbackView.vue";
import HomeView from "@/views/HomeView.vue";
import ImportPgnView from "@/views/ImportPgnView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView, meta: { requiresAuth: true } },
    { path: "/import", component: ImportPgnView, meta: { requiresAuth: true } },
    { path: "/auth/callback", component: CallbackView },
  ],
});

router.beforeEach(async (to) => {
  const user = await userManager.getUser();

  if (to.meta.requiresAuth && (!user || user.expired)) {
    await userManager.signinRedirect({ state: { target: to.fullPath } });
    return false;
  }
});

export default router;
