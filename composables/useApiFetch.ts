import type { UseFetchOptions } from "nuxt/app"
import { useRequestHeaders } from "nuxt/app"

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  let headers: any = {
    accept: "application/json",
  }

  const token = localStorage.getItem("Bearer") || ""
  if (token) {
    headers["Authorization"] = token as string
  }

  // NOTE:
  // need to check this is only if run as server i.e not gonna work if SPA.
  // as per copilot its not necessary. need to remove when things done
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }

  return useFetch(config.public.apiURL + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })
}

