<template>
  <div class="wrapper">

    <div v-if="p.screenSize">
      <n-icon @click="toggleDarkMode">
        <Moon v-if="darkMode" />
        <Sun v-else />
      </n-icon>
    </div>


    <div v-else>
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
  </div>
</template>

<script lang="ts" setup>
import { Moon, Sun } from "@vicons/fa"
import { useThemeStore } from "~/stores/theme"

const p = withDefaults(
  defineProps<{
    screenSize: boolean
  }>(),
  {
    screenSize: false
  },
)

const themeStore = useThemeStore()
const colorMode = useColorMode()

const darkMode = computed({
  get: () => themeStore.darkMode,
  set: (value) => themeStore.setDarkMode(value),
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}


watch(darkMode, (value) => {
  colorMode.preference = value ? "dark" : "light"
})

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>