<template>
  <n-list bordered hoverable>
    <template #header>
      <div>
        <b>
          {{ translatedWord('church_planters') }} :
          {{ p.churchPlanters.length }}
        </b>
      </div>
    </template>

    <n-scrollbar style="max-height: 250px">
      <n-list-item v-for="cp in p.churchPlanters">
        <n-space :size="10" vertical>
          <b>{{ cp.name }}</b>

          <div v-for="c in cp.churches">
            {{ c.name }}
          </div>
        </n-space>
      </n-list-item>
    </n-scrollbar>
  </n-list>
</template>

<script lang="ts" setup>
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
const p = defineProps<{
  churchPlanters: any[]
}>()
</script>
