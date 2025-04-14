<template>
  <n-tooltip :delay="400">

    <template #trigger>
      <n-button
        type="error"
        secondary
        size="small"
        @click="m.handleDelete"
      >
        <template #icon>

          <component :is="p.permanent ? DeleteForeverRound : DeleteRound" />
        </template>
      </n-button>
    </template>

    {{ p.permanent ? translatedWord('delete_permanently') : translatedWord('trash') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound, DeleteForeverRound } from '@vicons/material'
  import { useDialog } from 'naive-ui'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  import { RoutePaths } from '~/types/index.d'

  const emit = defineEmits(['deleteProgress'])
  // Language Switching
  const words = useLanguagesStore().words
  const usrPreferLang = useSettingStore().currentPreferredLanguage
  const helpers = useHelpers();
  const translatedWord = (key: string) => {
    return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
  };
  // e.o Language Switching

  const p = withDefaults(defineProps<{
    permanent?: boolean
    model: RoutePaths,
    id: number
  }>(), {
    permanent: true
  })


  const dialog = useDialog()

  const m = {
    handleDelete() {
      dialog.warning({
        title: translatedWord('confirm_deletion') + p.id,
        content: translatedWord('are_you_sure_you_cannot_undo_this_action_afterwards'),
        positiveText: translatedWord('confirm_delete'),
        negativeText: translatedWord('cancel'),
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
          await consume.delete(p.permanent ? p.permanent : false)
          emit('deleteProgress', true)
        },
      })
    }
  }

</script>

<style></style>