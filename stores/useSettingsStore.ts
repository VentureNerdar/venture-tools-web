import { defineStore } from 'pinia'
import type { LanguageFormModel } from '~/types'

export const useSettingStore = defineStore('setting', () => {
  const statuses = JSON.parse(localStorage.getItem('statuses') || '{}')
  const userPreferredLanguage = ref<LanguageFormModel>(
    JSON.parse(localStorage.getItem('user_preferred_language') || 'null')
  )

  const currentPreferredLanguage = computed(() => userPreferredLanguage)
  const contactStatuses = computed(() => statuses.filter((s: any) => s.type === 'contact'))
  const groupStatuses = computed(() => statuses.filter((s: any) => s.type === 'group'))
  const faithStatuses = computed(() => statuses.filter((s: any) => s.type === 'faith_status'))

  const options = computed(() => ({
    contact: contactStatuses.value.map((s: any) => ({ label: s.name, value: s.id })),
    group: groupStatuses.value.map((s: any) => ({ label: s.name, value: s.id })),
    faith: faithStatuses.value.map((s: any) => ({ label: s.name, value: s.id })),
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