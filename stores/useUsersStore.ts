import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const users = JSON.parse(localStorage.getItem('users') || '{}')
  const userRoles = ref<any>(JSON.parse(localStorage.getItem('userRoles') || '{}'))
  const setUserRoles = (roles: any) => {
    userRoles.value = roles
    localStorage.setItem('userRoles', JSON.stringify(roles))
  }

  return { users, userRoles, setUserRoles }
})