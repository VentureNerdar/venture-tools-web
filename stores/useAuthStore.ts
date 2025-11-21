import { defineStore } from "pinia"
import { createDiscreteApi, darkTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"
import type { ConfigProviderProps } from "naive-ui"
import { app } from '~/utils/firebase'


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
  let authUser = ref(JSON.parse(localStorage.getItem("authUser") || "{}"))
  const token = ref(localStorage.getItem("Bearer") || "")
  const loginTime = ref<number | null>(JSON.parse(localStorage.getItem("loginTime") || "0"))

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
      authUser.value = response as User
      localStorage.setItem("authUser", JSON.stringify(response) as string)
    }
  }

  async function registerDevice(userId: number) {
    try {
      // Generate a unique device ID
      const deviceId = generateDeviceId()
      let currentNotificationToken = null

      // Generate FCM Token and initialize Firebase Messaging
      try {
        const vapidKey = config.public.firebase.vapidKey
        const { getMessaging, getToken, onMessage } = await import('firebase/messaging')
        const messaging = getMessaging(app)

        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          currentNotificationToken = await getToken(messaging, { vapidKey })
          if (currentNotificationToken) {
            localStorage.setItem('notificationToken', currentNotificationToken)
          }
        }

        onMessage(messaging, (payload) => {
          console.log('Message received in foreground:', payload)
          if (payload.notification?.title && payload.notification?.body) {
            const { title, body } = payload.notification
            new Notification(title, {
              body,
              icon: '/logo-vertical.png',
            })
          }
        })
      } catch (err) {
        console.error('FCM error:', err)
      }

      // Store device ID in localStorage
      localStorage.setItem('deviceId', deviceId)

      const token = localStorage.getItem("Bearer") || ""
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }

      // Register device with backend
      await $fetch(`${config.public.apiURL}users/id/${userId}/devices`, {
        method: "POST",
        body: {
          device_id: deviceId,
          device_type: "web",
          device_name: navigator.userAgent,
          notification_token: currentNotificationToken,
        },
        headers: headers
      })
    } catch (error: any) {
      console.error("Error registering device:", error)
    }
  }

  function generateDeviceId(): string {
    return 'web_' + crypto.randomUUID()
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
      const now = Date.now()
      loginTime.value = now
      localStorage.setItem("loginTime", String(now))
      await registerDevice(response.user.id)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const token = localStorage.getItem("Bearer") || ""
    const deviceId = localStorage.getItem("deviceId") || ""

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
      body: {
        device_id: deviceId,
      },
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
    localStorage.removeItem("loginTime")

    navigateTo("/")
  }

  function isLoginExpired(): boolean {
    if (!loginTime.value) return true

    const now = Date.now()
    // 24 hours
    const hoursPassed = (now - loginTime.value) / (1000 * 60 * 60)
    return hoursPassed >= 24

    // Testing 3 min
    // const minutesPassed = (now - loginTime.value) / (1000 * 60)
    // return minutesPassed >= 3
  }

  return { user, login, fetchUser, logout, authUser, loginTime, isLoginExpired }
})
