<template>
  <n-tooltip
    trigger="hover"
    placement="top"
  >
    <template #trigger>
      <n-button
        :type="d.trashView ? 'error' : 'default'"
        size="small"
        @click="handleClick"
      >
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
      </n-button>
    </template>

    {{ d.trashView ? h.translate('exit_trashed_view') : h.translate('view_trashed_item') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound } from '@vicons/material'

  const emit = defineEmits(['trashViewToggled'])
  const h = useHelpers()

  const d = reactive({
    trashView: false
  })

  const handleClick = () => {
    d.trashView ? d.trashView = false : d.trashView = true
    emit('trashViewToggled', d.trashView)
  }

</script>

<style></style>