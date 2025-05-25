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
          <component :is="p.permanent ? DeleteForeverRound : ArchiveRound" />
        </template>
      </n-button>
    </template>

    {{ p.permanent ? h.translate('delete_permanently') : h.translate('archive') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteForeverRound, ArchiveRound } from '@vicons/material'
  import { useDialog } from 'naive-ui'
  import { RoutePaths } from '~/types/index.d'

  const emit = defineEmits(['deleteProgress'])
  const h = useHelpers()

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
        title: p.permanent ? h.translate('confirm_deletion') : h.translate('confirm_archive'),
        content: p.permanent 
          ? h.translate('are_you_sure_you_cannot_undo_this_action_afterwards')
          : h.translate('are_you_sure_you_want_to_archive_this_item'),
        positiveText: p.permanent ? h.translate('confirm_delete') : h.translate('confirm_archive'),
        negativeText: h.translate('cancel'),
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