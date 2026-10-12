import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<{ name: string; role: string } | null>('minetrack_user', {
    default: () => null,
    maxAge: 60 * 60 * 8
  })

  const isLoggedIn = computed(() => !!user.value)
  const role = computed(() => user.value?.role ?? '')

  function login(name: string, userRole: string) {
    user.value = { name, role: userRole }
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, role, login, logout }
})