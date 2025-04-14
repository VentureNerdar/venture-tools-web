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
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"

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

  const response = await $fetch(routePath, requestOptions).catch(
    (error: any) => {
      const errorTexts = [] as string[]
      Object.entries(error.response._data.errors).forEach(([name, text]) => {
        errorTexts.push(text as any)
      })

      // Language Switching
      const words = useLanguagesStore().words
      const usrPreferLang = useSettingStore().currentPreferredLanguage
      const helpers = useHelpers();
       const toSnakeCase = (str: string) => {
        return str
          .toLowerCase()
          .replace(/[.\s]+/g, '_')
          .replace(/^_+|_+$/g, '');
      };
      const translatedWord = (key: string) => {
        return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
      };
      // e.o Language Switching

      [...errorTexts.map((text) => {
            let message:string = ""; 
              if(typeof text[0] === 'string') {
                message = text[0]
              }
           
          })]

      discreteNotificationAPI.notification.error({
        title: "Aiyo! Something went wrong.",
        description:
        "[ STATUS : " +
        error.response.status +
        " ] " + '',
        // error.response._data.message,
        content: () => {
          return h("div", {}, [...errorTexts.map((text) => {
            let message:string = ""; 
              if(typeof text[0] === 'string') {
                message = text[0]
              }
            return h("div", {}, text)
          })])
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
    storeOptions.storeState = response
    if (storeOptions.isPersist) {
      localStorage.setItem(storeOptions.key, JSON.stringify(response))
    }
  }

  // Define notification title
  if (["save", "delete", "restore"].includes(consumptionType)) {
    const responseTitleMap = {
      save: id ? "Updated" : "Created",
      delete: permanent ? "Deleted" : "Trashed",
      restore: "Restored",
    }

    const responseTitle =
      responseTitleMap[consumptionType as "save" | "delete" | "restore"]

    discreteNotificationAPI.notification.success({
      title: responseTitle,
      content: `Data has been ${consumptionType}d successfully`,
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

      console.log(requestOptions)
      console.log(id)

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
    ;(api as any).update = (data: UseFetchOptions<T>) =>
      useFetch(routePath, { method: "PUT", body: data, ...fetchOptions })
    ;(api as any).view = (query: BrowseCondition) =>
      useFetch(routePath, { method: "GET", query, ...fetchOptions })
  }

  return api
}

