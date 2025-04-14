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
const selectedLanguage = ref<number>(0)
const auth = useAuthStore()
const settingStore = useSettingStore()
const languageStore = useLanguagesStore()

if (auth.authUser.preferred_language_id) {
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

onMounted(() => {
  const lang = languageStore.languages.find(
    (l: any) => l.id === selectedLanguage.value,
  )
  if (lang) {
    settingStore.setUserPreferredLanguage(lang)
  }
})

watch(selectedLanguage, (id) => {
  if (!id) return
  const lang = languageStore.languages.find((l: any) => l.id === id)
  if (lang) {
    settingStore.setUserPreferredLanguage(lang)
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
}
</style>
