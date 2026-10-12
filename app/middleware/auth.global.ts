import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (to.path === '/equipment' && !['admin', 'supervisor'].includes(auth.role)) {
    return navigateTo('/')
  }
})