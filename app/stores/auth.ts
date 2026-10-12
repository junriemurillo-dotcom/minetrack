import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; role: string }
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    role: (state) => state.user?.role ?? ''
  },
  actions: {
    login(name: string, role: string) {
      this.user = { name, role }
    },
    logout() {
      this.user = null
    }
  }
})