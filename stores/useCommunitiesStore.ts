import { defineStore } from "pinia"

export const useCommunityStore = defineStore("communities", () => {
  const communities = JSON.parse(localStorage.getItem("communities") || "{}")
  // const communityChecklists = JSON.parse(
  //   localStorage.getItem("communityChecklists") || "{}",
  // )
  const communityChecklists = ref(
    JSON.parse(localStorage.getItem("communityChecklists") || "[]")
  )
  return { communities, communityChecklists }
})

