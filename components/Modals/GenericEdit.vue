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
    {{ h.translate('edit') }}
  </n-tooltip>
</template>

<script
  lang="ts"
  setup
>
  import { EditRound } from '@vicons/material'
  const emit = defineEmits(['editClick'])

  const handleClick = () => {
    emit('editClick')
  }
// Language Switching
const h = useHelpers();
// e.o Language Switching


</script>

<style></style>