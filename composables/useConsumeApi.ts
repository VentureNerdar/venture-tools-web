import type { UseFetchOptions } from "nuxt/app"

import type {
  BrowseCondition,
  ListCondition,
  StoreOptions,
} from "~/types/index.d"
import type { ConfigProviderProps } from "naive-ui"

import { RoutePaths } from "~/types/index.d"
import { createDiscreteApi, darkTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"
import { useAuthStore } from "~/stores/useAuthStore"

type ConsumptionType =
  | "browse"
  | "save"
  | "delete"
  | "view"
  | "restore"
  | "list"

// Prepping Notification
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
  themeOverrides: {
    ...NaiveThemeOverrides.darkTheme,
  },
}))

const discreteNotificationAPI = createDiscreteApi(["notification"], {
  configProviderProps: configProviderPropsRef,
})
// e.o Prepping Notification

// Initial prep
const initialPreparation = (path: RoutePaths, id?: number) => {
  const config = useRuntimeConfig()
  const routePath =
    config.public.apiURL + path + (id && id !== 0 ? `/id/${id}` : "")

  let headers: any = {
    accept: "application/json",
  }

  const token = localStorage.getItem("Bearer") || ""

  if (token) {
    headers["Authorization"] = token as string
  }

  const fetchOptions = {
    headers: headers,
  }

  return { routePath, headers, fetchOptions }
} // e.o Initial prep

const request = async (
  routePath: string,
  consumptionType: ConsumptionType,
  requestOptions: any,
  storeOptions: StoreOptions,
  id?: number,
  permanent?: boolean,
) => {
  if (consumptionType === "restore") {
    routePath = routePath + "/restore"
  }

  if (consumptionType === "list") {
    routePath = routePath + "/list"
  }

  const authStore = useAuthStore()

  if (
    authStore.isLoginExpired()
  ) {
    await authStore.logout()
    discreteNotificationAPI.notification.error({
      title: "Please login again.",
      description: "Your session is expired",
    })
    return navigateTo("/login")
  }

  const response = await $fetch(routePath, requestOptions).catch(
    (error: any) => {
      if (error.response.status === 401) {
        localStorage.removeItem("Bearer")

        discreteNotificationAPI.notification.error({
          title: "Please login again.",
          description: "Your session is expired",
        })

        navigateTo("/")
      }

      const errorTexts = [] as string[]
      Object.entries(error.response._data.errors).forEach(([name, text]) => {
        errorTexts.push(text as any)
      })

      const helper = useHelpers()

        ;[
          ...errorTexts.map((text) => {
            let message: string = ""
            if (typeof text[0] === "string") {
              message = text[0]
            }
            console.log("Message", message)
          }),
        ]

      discreteNotificationAPI.notification.error({
        title: helper.translate("something_went_wrong"),
        description: "[ STATUS : " + error.response.status + " ] " + "",
        // error.response._data.message,
        content: () => {
          return h("div", {}, [
            ...errorTexts.map((text) => {
              let message: string = ""
              if (typeof text[0] === "string") {
                message = text[0]
              }
              return h("div", {}, helper.translate(helper.toSnakeCase(message)))
            }),
          ])
        },
        duration: 3000,
        keepAliveOnHover: true,
      })
    },
  )

  if (response) {
    switch (consumptionType) {
      case "browse":
        return respond("browse", response, storeOptions)

      case "save":
        return respond("save", response, storeOptions, id)

      case "delete":
        return respond("delete", response, false, id, permanent)

      case "restore":
        return respond("restore", response, false, id)

      case "list":
        return respond("list", response, false)
    }
  }

  return false
}

const respond = (
  consumptionType: ConsumptionType,
  response: any,
  storeOptions: StoreOptions,
  id?: number,
  permanent?: boolean,
) => {
  // Process store operation
  if (storeOptions !== false) {
    // Update store state using Pinia's store actions
    if (storeOptions.storeState) {

      if (Array.isArray(storeOptions.storeState)) {
        // For array states, replace the entire array
        storeOptions.storeState.length = 0
        if (Array.isArray(response)) {
          storeOptions.storeState.push(...response)
        } else if (response && typeof response === 'object') {
          // Handle case where response might be wrapped in a data property
          const data = response.data || response
          if (Array.isArray(data)) {
            storeOptions.storeState.push(...data)
          }
        }
      } else if (typeof storeOptions.storeState === 'object') {
        // For object states, update the object
        if (response && typeof response === 'object') {
          const data = response.data || response
          Object.assign(storeOptions.storeState, data)
        }
      }
    }

    if (storeOptions.isPersist) {
      const dataToStore = response.data || response
      localStorage.setItem(storeOptions.key, JSON.stringify(dataToStore))
    }
  }

  // Define notification title
  if (["save", "delete", "restore"].includes(consumptionType)) {
    const responseTitleMap = {
      save: id ? "Updated" : "Created",
      delete: permanent ? "Deleted" : "Trashed",
      restore: "Restored",
    }
    const helpers = useHelpers()
    const responseTitle = helpers.translate(helpers.toSnakeCase(responseTitleMap[consumptionType as "save" | "delete" | "restore"]))

    const responseContent = helpers.translate(`data_has_been_${consumptionType}d_successfully`)

    discreteNotificationAPI.notification.success({
      title: responseTitle,
      content: responseContent,
      duration: 3000,
    })
  }

  // Return data response
  return response
}

export function useConsumeApi<T>(path: RoutePaths, id?: number) {
  // Initial prep
  const { routePath, fetchOptions } = initialPreparation(path, id)

  const api = {
    // BROWSE
    browse: async (
      query: BrowseCondition,
      storeOptions: StoreOptions = false,
    ) => {
      return await request(
        routePath,
        "browse",
        {
          method: "GET",
          query,
          ...fetchOptions,
        },
        storeOptions,
      )
    }, // e.o BROWSE

    // LIST
    list: async (query: ListCondition) => {
      return await request(
        routePath,
        "list",
        {
          method: "GET",
          query,
          ...fetchOptions,
        },
        false,
      )
    }, // e.o LIST

    // SAVE
    save: async (payload: any, storeOptions: StoreOptions = false) => {
      const requestOptions = {
        method: id !== null && id !== undefined ? "PUT" : "POST",
        body: payload,
        ...fetchOptions,
      }

      return await request(routePath, "save", requestOptions, storeOptions, id)
    }, // e.o SAVE

    // DELETE
    delete: async (permanent: boolean = false) => {
      return await request(
        routePath,
        "delete",
        {
          method: "DELETE",
          query: { force: permanent },
          ...fetchOptions,
        },
        false,
        id,
        permanent,
      )
    }, // e.o DELETE

    // RESTORE
    restore: async () => {
      return await request(
        routePath,
        "restore",
        {
          method: "POST",
          ...fetchOptions,
        },
        false,
        id,
      )
    }, // e.o RESTORE
  }

  if (id) {
    ; (api as any).update = (data: UseFetchOptions<T>) =>
      useFetch(routePath, { method: "PUT", body: data, ...fetchOptions })
      ; (api as any).view = (query: BrowseCondition) =>
        useFetch(routePath, { method: "GET", query, ...fetchOptions })
  }

  return api
}
