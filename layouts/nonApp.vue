<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="darkThemeOverrides">
    <n-notification-provider :max="5">
      <n-dialog-provider>
        <n-layout>
          <NuxtPage />
        </n-layout>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"

const darkThemeOverrides = { ...NaiveThemeOverrides.darkTheme }
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 80px);

  .main {
    padding: 10px;
    height: calc(100vh - 90px);
    width: calc(100vw - 80px);
    margin-left: 60px;
  }
}

html.dark {
  body {
    background-color: #555;
  }
}
</style>
