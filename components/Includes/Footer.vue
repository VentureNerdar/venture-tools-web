<template>
  <div
    class="footer"
    :class="{ dark: themeStore.darkMode }"
  >
    Venture Tools © 2025 | Venture.org. All Rights Reserved.
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
  width: calc(100vw - 73px);
  margin-left: 61px;
  padding-right: 10px;
  text-align: right;

  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
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
