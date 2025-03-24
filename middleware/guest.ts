import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('Bearer') || ''

  if (token && to.path !== '/home') {
    return navigateTo('/dashboard', { replace: true })
  }
})