<template>
  <n-list bordered hoverable>
    <template #header>
      <div>
        <b>
          Church Planters :
          {{ p.churchPlanters.length }}
        </b>
      </div>
    </template>

    <n-scrollbar style="max-height: 250px">
      <n-list-item v-for="cp in p.churchPlanters">
        <n-space :size="10" vertical>
          <b>{{ cp.name }}</b>

          <div v-for="c in cp.churches">
            {{ c.name }}
          </div>
        </n-space>
      </n-list-item>
    </n-scrollbar>
  </n-list>
</template>

<script lang="ts" setup>
const p = defineProps<{
  churchPlanters: any[]
}>()
</script>
