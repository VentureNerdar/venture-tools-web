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
