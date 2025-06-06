import { defineStore } from 'pinia'

export const usePrayerPromptStore = defineStore('prayerPrompt', () => {
  const prayerPrompts = JSON.parse(localStorage.getItem('prayerPrompts') || '{}')
  return { prayerPrompts }
})