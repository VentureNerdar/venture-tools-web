import { defineStore } from "pinia"

export const useLanguagesStore = defineStore("languages", () => {
  const languages = JSON.parse(localStorage.getItem("languages") || "[]")
  const words = JSON.parse(localStorage.getItem("languageWords") || "[]")
  return { languages, words }
})

