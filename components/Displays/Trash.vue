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

    {{ d.trashView ? 'Exit Trashed View' : 'View Trashed Items' }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound } from '@vicons/material'

  const emit = defineEmits(['trashViewToggled'])

  const d = reactive({
    trashView: false
  })

  const handleClick = () => {
    d.trashView ? d.trashView = false : d.trashView = true
    emit('trashViewToggled', d.trashView)
  }

</script>

<style></style>