import { defineStore } from "pinia"
import { useApiFetch } from "~/composables/useApiFetch"
import { createDiscreteApi, darkTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"
import type { ConfigProviderProps } from "naive-ui"

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
  themeOverrides: {
    ...NaiveThemeOverrides.darkTheme,
  },
}))

const discreteNotificationAPI = createDiscreteApi(["notification"], {
  configProviderProps: configProviderPropsRef,
})

type User = {
  id?: number
  name: string
  email: string
}

type Credentials = {
  email: string
  password: string
}

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig()
  const user = ref<User | null>(null)
  let authUser = JSON.parse(localStorage.getItem("authUser") || "{}")
  const token = ref(localStorage.getItem("Bearer") || "")

  async function fetchUser() {
    const token = localStorage.getItem("Bearer") || ""

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as any

    if (token) {
      headers["Authorization"] = token as string
    }

    const response = (await $fetch(config.public.apiURL + "auth/user", {
      method: "GET",
      credentials: "include",
      headers: headers,
    }).catch((error: any) => {
      discreteNotificationAPI.notification.error({
        title: "Cannot login.",
        description: error.response.status + " " + error.response._data.message,
        duration: 3000,
        keepAliveOnHover: true,
      })

      return
    })) as any

    if (response) {
      user.value = response as User
      localStorage.setItem("authUser", JSON.stringify(response) as string)
    }
  }

  async function login(credentials: Credentials) {
    await $fetch(config.public.rootURL + "sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    })

    const response = (await $fetch(config.public.apiURL + "login", {
      method: "POST",
      body: credentials,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((error: any) => {
      discreteNotificationAPI.notification.error({
        title: "Cannot login.",
        description: error.response.status + " " + error.response._data.message,
        duration: 3000,
        keepAliveOnHover: true,
      })

      return
    })) as any

    if (response) {
      token.value = "Bearer " + response.token
      localStorage.setItem("Bearer", token.value)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const token = localStorage.getItem("Bearer") || ""

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as any

    if (token) {
      headers["Authorization"] = token as string
    }

    await $fetch(config.public.apiURL + "auth/logout", {
      method: "POST",
      credentials: "include",
      headers: headers,
    }).catch((error: any) => {
      discreteNotificationAPI.notification.error({
        title: "Cannot login.",
        description: error.response.status + " " + error.response._data.message,
        duration: 3000,
        keepAliveOnHover: true,
      })

      return
    })

    user.value = null

    localStorage.removeItem("Bearer")

    navigateTo("/")
  }

  return { user, login, fetchUser, logout, authUser }
})
