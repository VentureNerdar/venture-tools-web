<template>
  <n-tooltip :delay="400">
    <template #trigger>
      <n-button
        type="warning"
        secondary
        size="small"
        @click="m.handleRestore"
      >
        <template #icon>
          <RestorePageRound />
        </template>
      </n-button>
    </template>

    {{ translatedWord('restore') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { RestorePageRound } from '@vicons/material'
  import { useDialog } from 'naive-ui'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  import { RoutePaths } from '~/types/index.d'

  const emit = defineEmits(['restoreProgress'])
  // Language Switching
  const words = useLanguagesStore().words
  const usrPreferLang = useSettingStore().currentPreferredLanguage
  const helpers = useHelpers();
  const translatedWord = (key: string) => {
    return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
  };
// e.o Language Switching

  const p = withDefaults(defineProps<{
    model: RoutePaths,
    id: number
  }>(), {
  })

  const dialog = useDialog()

  const m = {
    handleRestore() {
      dialog.warning({
        title: 'Confirm restoration' + p.id,
        content: 'Are you sure you want to restore the item?',
        positiveText: 'Confirm Restoration',
        negativeText: 'Cancel',
        closeOnEsc: true,
        transformOrigin: 'center',
        positiveButtonProps: {
          type: 'error',
          ghost: true,
        },
        negativeButtonProps: {
          type: 'success',
          ghost: false
        },
        onPositiveClick: async () => {
          const consume = useConsumeApi(p.model, p.id)
          await consume.restore()

          emit('restoreProgress', true)
        },
      })
    }
  }

</script>

<style></style>