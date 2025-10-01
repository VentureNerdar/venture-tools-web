<template>
  <n-tabs
    v-if="!isMobile"
    type="line"
    default-value="configure"
    style="padding: 10px"
  >
    <n-tab-pane
      name="synchronize"
      tab="Synchronize"
      :class="{ 'tab': !isMobile }"
    >
      <FormPartialsIShareSynchronize />
    </n-tab-pane>

    <n-tab-pane
      name="configure"
      tab="Configure"
      :class="{ 'tab': !isMobile }"
    >
      <FormPartialsIShareConfigure />
    </n-tab-pane>

  </n-tabs>

  <DisplaysMobileEmpty v-else />
</template>

<script
  lang="ts"
  setup
>
  const screenSize = useScreenSize()
  const isMobile = screenSize.isMobile


</script>

<style
  lang="scss"
  scoped
>
  html {
    .tab {
      width: calc(100vw - 335px);
      min-height: calc(100vh - 162px);
      border: 1px solid rgba(0, 0, 0, 0.09);
      border-radius: 0 0 4px 4px;
      border-top: 0px;
      padding: 10px;
    }

    &.dark {
      .tab {
        border-color: rgba(255, 255, 255, 0.08);
      }
    }
  }
</style>