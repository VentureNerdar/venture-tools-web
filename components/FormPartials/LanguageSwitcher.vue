<template>
  <div class="container">
    <n-select
      v-model:value="selectedLanguage"
      :options="languageOptions"
      placeholder="Please Select"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useAuthStore } from "~/stores/useAuthStore"
import { useSettingStore } from "~/stores/useSettingsStore"

// — selected value
const selectedLanguage = ref<number>(1)
const auth = useAuthStore()
const settingStore = useSettingStore()
const languageStore = useLanguagesStore()
const languages = languageStore.languages

// Watch for changes in userPreferredLanguage


if (auth.authUser.preferred_language_id) {
  console.log('auth.authUser.preferred_language_id', auth.authUser.preferred_language_id)
  selectedLanguage.value = auth.authUser.preferred_language_id
} else {
  selectedLanguage.value = 1
}

const languageOptions = computed(() =>
  languageStore.languages.map((lang: any) => ({
    label: lang.name,
    value: lang.id,
  })),
)

// onMounted(() => {
  
//   const lang = languageStore.languages.find(
//     (l: any) => l.id === selectedLanguage.value,
//   )
//   if (lang) {
//     settingStore.setUserPreferredLanguage(lang)
//   }
// })

watch(
  () => languageStore.languages,
  (langs) => {
    if (!langs.length) return

    const lang = langs.find((l: any) => l.id === selectedLanguage.value)
    if (lang) {
      settingStore.setUserPreferredLanguage(lang)
    }
  },
  { immediate: true }
)

watch(selectedLanguage, (id) => {
  if (!id) return
  const lang = languageStore.languages.find((l: any) => l.id === id)
  if (lang) {
    settingStore.setUserPreferredLanguage(lang)
  }
})

watch(() => settingStore.userPreferredLanguage, (newLang) => {
  if (newLang && newLang.id) {
    selectedLanguage.value = newLang.id
  }
}, { immediate: true })

</script>

<style lang="scss" scoped>
.container {
  width: 200px;
}
</style>
