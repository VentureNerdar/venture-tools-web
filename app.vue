<template>
  <NuxtLayout>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-modal-provider>
          <NuxtPage />
        </n-modal-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <!-- <n-theme-editor /> -->
  </NuxtLayout>
</template>

<script lang="ts">

</script>
<style
  lang="scss"
  scoped
>
  body {
    padding: 0px;
    margin: 0px;
  }
</style>

<style>

  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0.0;
    filter: blur(20px);
  }
</style>
