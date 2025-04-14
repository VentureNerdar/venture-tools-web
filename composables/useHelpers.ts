import { format, isValid, parseISO } from "date-fns"
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

    getTranslatedWord: (
      translations: LanguageTranslationFormModel[],
      words: LanguageWordFormModel[],
      word: string
    ) => {
      let translatedWord = ""
      let wordId = 0
      if (words) {
        const systemWord = words.find((sw) => sw.word == word)
        if (systemWord && systemWord.id) {
          wordId = systemWord.id
        }
      }
      if (translations && wordId) {
        const translation = translations.find(
          (translation: any) => translation.system_language_word_id === wordId,
        )
        if (translation) {
          translatedWord = translation.translation
        }
      }
      return translatedWord
    }

  }

  return helpers
}
