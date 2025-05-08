import { defineStore } from 'pinia'
import type { LanguageFormModel } from '~/types'

interface Status {
  id: number
  name: string
  type: 'contact' | 'group' | 'faith_status'
}

export const useSettingStore = defineStore('setting', () => {
  const statuses = ref<Status[]>(JSON.parse(localStorage.getItem('statuses') || '[]'))
  const userPreferredLanguage = ref<LanguageFormModel>(
    JSON.parse(localStorage.getItem('user_preferred_language') || 'null')
  )

  const currentPreferredLanguage = computed(() => userPreferredLanguage)
  const contactStatuses = computed(() => statuses.value.filter((s) => s.type === 'contact'))
  const groupStatuses = computed(() => statuses.value.filter((s) => s.type === 'group'))
  const faithStatuses = computed(() => statuses.value.filter((s) => s.type === 'faith_status'))

  const options = computed(() => ({
    contact: contactStatuses.value.map((s) => ({ label: s.name, value: s.id })),
    group: groupStatuses.value.map((s) => ({ label: s.name, value: s.id })),
    faith: faithStatuses.value.map((s) => ({ label: s.name, value: s.id })),
    ageGroups: [
      { value: 'Under 18 years old', label: 'Under 18 years old' },
      { value: '18-25 years old', label: '18-25 years old' },
      { value: '26-40 years old', label: '26-40 years old' },
      { value: 'Over 40 years old', label: 'Over 40 years old' },
    ],
    genders: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
  }))

  function setUserPreferredLanguage(lang: LanguageFormModel) {
    userPreferredLanguage.value = lang
    localStorage.setItem(
      'user_preferred_language',
      JSON.stringify(lang)
    )
  }

  return { statuses, contactStatuses, groupStatuses, faithStatuses, options, userPreferredLanguage, setUserPreferredLanguage, currentPreferredLanguage }
})