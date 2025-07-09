<template>
  <div class="wrapper">
    <n-switch
      v-model:value="darkMode"
      size="small"
    >
      <template #icon>
        <n-icon>
          <Moon v-if="darkMode" />
          <Sun v-else />
        </n-icon>
      </template>
    </n-switch>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { Moon, Sun } from "@vicons/fa"
  import { useThemeStore } from "~/stores/theme"

  const themeStore = useThemeStore()
  const colorMode = useColorMode()

  const darkMode = computed({
    get: () => themeStore.darkMode,
    set: (value) => themeStore.setDarkMode(value),
  })


  watch(darkMode, (value) => {
    colorMode.preference = value ? "dark" : "light"
  })

</script>

<style
  lang="scss"
  scoped
>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>