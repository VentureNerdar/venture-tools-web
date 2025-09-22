<template>
  <div
    class="footer"
    :class="{ dark: themeStore.darkMode }"
  >
    Venture Tools © 2025 | Venture.org.
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "~/stores/theme"
const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
.footer {
  height: 40px;
  line-height: 40px;
  background: white;
  color: #0a233d;
  width: 100vw;
  text-align: center;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

.footer.dark {
  background: #0a233d;
  color: #17badf;
}

.footer.light {
  background: white;
  color: #0a233d;
}
</style>
