import { format, isValid, parseISO } from "date-fns"

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
  }

  return helpers
}
