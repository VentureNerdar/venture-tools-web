<template>
  <div class="center">
    <n-empty :description="translatedWord('under_construction')">
      <template #icon>
        <n-icon>
          <ConstructionRound />
        </n-icon>
      </template>
    </n-empty>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { ConstructionRound } from '@vicons/material'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  // Language Switching
  const words = useLanguagesStore().words
  const usrPreferLang = useSettingStore().currentPreferredLanguage
  const helpers = useHelpers();
  const translatedWord = (key: string) => {
    return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
  };
// e.o Language Switching
</script>

<style
  lang="scss"
  scoped
>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    width: calc(100vw - 80px);
  }
</style>