<template>
  <div class="center">
    <n-empty :description="h.translate('under_construction')">
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
  const h = useHelpers();
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