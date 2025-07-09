import { format, isValid, parseISO } from "date-fns"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"
import type { LanguageTranslationFormModel, LanguageWordFormModel } from "~/types"

export function useHelpers() {
  const helpers = {
    // Format Date
    formatDate: (dateString: Date | "N/A" | string) => {
      if (dateString === "N/A") return "N/A"

      const dateObj =
        typeof dateString === "string" ? parseISO(dateString) : dateString

      if (!isValid(dateObj)) return "Invalid Date"

      return format(dateObj, "dd MMM yyyy")
    }, // e.o Format Date

    // Translate
    translate: (key: string) => {

      let translate = helpers.toTitleCase(key.replaceAll("_", " "))
      let wordId = 0
      const translations = useSettingStore().currentPreferredLanguage.value.translations
      const words = useLanguagesStore().words

      if (words) {

        const systemWord = words.find((sw: LanguageWordFormModel) => sw.word == key)
        if (systemWord && systemWord.id) wordId = systemWord.id

      }

      if (translations && wordId) {

        const translation = translations.find(
          (translation: LanguageTranslationFormModel) => translation.system_language_word_id === wordId,
        )

        translate = translation ? translation.translation : key

      } else {

        console.error("Translation not found for key: " + key)

      }

      return translate

    },
    // e.o Translate

    // To Snake Case
    toSnakeCase: (str: string) => {

      return str
        .toLowerCase()
        .replace(/-/g, '_')
        .replace(/[.\s]+/g, '_')
        .replace(/^_+|_+$/g, '')

    },
    // e.o To Snake Case

    // To Title Case
    toTitleCase(str: string) {

      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      })

    },
    // e.o To Title Case
  }

  return helpers
}
