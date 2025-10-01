<template>
  <n-empty
    class="mobile-empty"
    description="Please use this feature from a computer browser. It’s not available on mobile browsers."
    size="small"
  >
    <template #icon>
      <n-icon>
        <AppBlockingRound />
      </n-icon>
    </template>
  </n-empty>
</template>

<script
  lang="ts"
  setup
>
  import { AppBlockingRound } from '@vicons/material'
</script>

<style
  lang="scss"
  scoped
>
  .mobile-empty {
    height: calc(100vh - 160px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
</style>