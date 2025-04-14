<template>
  <n-tooltip :delay="400">
    <template #trigger>
      <n-button
        type="warning"
        secondary
        size="small"
        @click="handleClick"
      >
        <template #icon>
          <EditRound />
        </template>
      </n-button>
    </template>
    {{ translatedWord('edit') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { EditRound } from '@vicons/material'
import { useLanguagesStore } from '~/stores/useLanguagesStore'
import { useSettingStore } from '~/stores/useSettingsStore'
  const emit = defineEmits(['editClick'])

  const handleClick = () => {
    emit('editClick')
  }
// Language Switching
const words = useLanguagesStore().words
const usrPreferLang = useSettingStore().currentPreferredLanguage
const helpers = useHelpers();
const translatedWord = (key: string) => {
  return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
};
// e.o Language Switching


</script>

<style></style>