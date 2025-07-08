<template>
  <n-config-provider
    :theme="currentTheme"
    :theme-overrides="currentThemeOverrides"
  >
    <n-notification-provider :max="5">
      <n-dialog-provider>
        <n-layout>
          <IncludesHeader />

          <div class="content">
            <IncludesNavigation />

            <div class="main">
              <n-scrollbar
                style="max-height: calc(100vh - 100px)"
                :size="20"
                :x-scrollable="false"
                :show-scrollbar="true"
              >
                <NuxtPage />
              </n-scrollbar>
            </div>

            <div style="clear: both"></div>
          </div>

          <IncludesFooter />
        </n-layout>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, lightTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"
import { useThemeStore } from "~/stores/theme"

const themeStore = useThemeStore()

const darkThemeOverrides = { ...NaiveThemeOverrides.darkTheme }
const lightThemeOverrides = { ...NaiveThemeOverrides.lightTheme }

const currentTheme = computed(() =>
  themeStore.darkMode ? darkTheme : lightTheme,
)
const currentThemeOverrides = computed(() =>
  themeStore.darkMode ? darkThemeOverrides : lightThemeOverrides,
)
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
