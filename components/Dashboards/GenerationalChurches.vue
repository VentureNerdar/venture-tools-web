<template>
  <div>
    <div
      style="width: 400px"
      :class="{ 'tab-wrapper': isMobile }"
    >
      <n-tabs
        v-model:value="activeTab"
        type="segment"
        animated
      >
        <n-tab-pane
          name="tree"
          tab="Tree"
        />
        <n-tab-pane
          name="graph"
          tab="Graph"
        />
      </n-tabs>
    </div>
  </div>
  <Suspense>
    <template #default>
      <DashboardPartialsTree v-if="activeTab === 'tree'" />
      <DashboardPartialsGraph v-else />
    </template>
    <template #fallback>
      <div class="spinner">
        <n-spin />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from "vue"

const activeTab = ref("tree")
const screenSize = useScreenSize()
const isMobile = screenSize.isMobile
</script>

<style scoped>
.spinner {
  display: flex;
  height: calc(100vh - 160px);
  justify-content: center;
  align-items: center;
}

.tab-wrapper {
  margin: 0 auto
}
</style>
