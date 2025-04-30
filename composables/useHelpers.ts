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

    // Language Switching
    translate: (
      key: string
    ) => {
      let translate = ""
      let wordId = 0
      const translations = useSettingStore().currentPreferredLanguage.value.translations
      // const translations = useLanguagesStore().languages[0].translations
      const words = useLanguagesStore().words



      if (words) {
        const systemWord = words.find((sw: LanguageWordFormModel) => sw.word == key)
        if (systemWord && systemWord.id) {
          wordId = systemWord.id
        }
      }
      if (translations && wordId) {
        const translation = translations.find(
          (translation: LanguageTranslationFormModel) => translation.system_language_word_id === wordId,
        )
        if (translation) {
          translate = translation.translation
        }
      }
      return translate
    },
    // e.o Language Switching

    // snake case for language switching
    toSnakeCase: (str: string) => {
      return str
        .toLowerCase()
        .replace(/[.\s]+/g, '_')
        .replace(/^_+|_+$/g, '')
    }
    // e.o snake case for language switching

  }

  return helpers
}
