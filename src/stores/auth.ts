import { defineStore } from "pinia";
import { getUser } from "@/auth/auth";
import type { User } from "oidc-client-ts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => state.user?.expired === false,
  },

  actions: {
    async loadUser() {
      this.user = await getUser();
      this.loading = false;
    },
  },
});
