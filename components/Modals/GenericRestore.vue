<template>
  <n-tooltip :delay="400">
    <template #trigger>
      <n-button
        type="warning"
        secondary
        size="small"
        @click="m.handleRestore"
        :style="`width: ${p.buttonWidth ?? 'auto'};`"
      >
        <template #icon>
          <RestorePageRound />
        </template>
      </n-button>
    </template>

    {{ h.translate('restore') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { RestorePageRound } from '@vicons/material'
  import { useDialog } from 'naive-ui'
  import { RoutePaths } from '~/types/index.d'

  const emit = defineEmits(['restoreProgress'])
  const h = useHelpers()

  const p = withDefaults(defineProps<{
    model: RoutePaths,
    id: number,
    buttonWidth?: string
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