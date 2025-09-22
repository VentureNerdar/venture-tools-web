<template>
  <div>
    <div v-if="!isMobile">
      <n-space vertical>
        <n-tabs
          type="card"
          placement="left"
          :value="d.currentTab"
          style="height: calc(100vh - 100px)"
          @update:value="m.handleTabChange"
        >
          <n-tab-pane
            name="insights"
            :tab="h.translate('insights')"
            class="tab"
          >
            <DashboardsInsights />
          </n-tab-pane>

          <n-tab-pane
            name="church_locations"
            :tab="h.translate('church_locations')"
            class="tab"
          >
            <DashboardsChurchLocations :current-tab="d.currentTab" />
          </n-tab-pane>

          <n-tab-pane
            name="generational_churches"
            :tab="h.translate('generational_churches')"
            class="tab"
          >
            <DashboardsGenerationalChurches />
          </n-tab-pane>

          <n-tab-pane
            name="people_groups"
            :tab="h.translate('people_groups')"
            class="tab"
          >
            <DashboardsPeopleGroups />
          </n-tab-pane>
        </n-tabs>
      </n-space>
    </div>

    <div v-else>
      <div class="mobile-select">
        <n-select
          size="large"
          v-model:value="value"
          :options="options"
          @update:value="m.handleTabChange"
        />
      </div>
      <div class="mobile-tab">
        <DashboardsInsights v-if="d.currentTab === 'insights'" />
        <DashboardsGenerationalChurches v-else-if="d.currentTab === 'generational_churches'" />
        <DashboardsPeopleGroups v-else-if="d.currentTab === 'people_groups'" />
        <DashboardsChurchLocations v-else-if="d.currentTab === 'church_locations'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const value = ref('insights')

// Language Switching
const h = useHelpers()
// e.o Language Switching



const options = [
  { label: h.translate("insights"), value: "insights" },
  { label: h.translate("church_locations"), value: "church_locations" },
  { label: h.translate("generational_churches"), value: "generational_churches" },
  { label: h.translate("people_groups"), value: "people_groups" },
]


const width = ref(process.client ? window.innerWidth : 1200)
const isMobile = computed(() => width.value < 768)

if (process.client) {
  window.addEventListener("resize", () => {
    width.value = window.innerWidth
  })

}
const d = reactive({
  currentTab: route.query.settingType as string,
})

if (!("dashboardType" in route.query)) {
  router.push({ query: { dashboardType: "insights" } })
}

const m = {
  handleTabChange(tab: string) {
    d.currentTab = tab
    router.push({ query: { dashboardType: tab } })
  },
}

watch(
  () => route.query.dashboardType,
  (dashboardType) => {
    d.currentTab = dashboardType as string
  },
)
</script>

<style lang="scss" scoped>
html {
  .tab {
    border: 1px solid rgba(0, 0, 0, 0.03);
    border-radius: 0 4px 4px 0;
    border-left: 0px;
    padding: 10px !important;
  }

  &.dark {
    .tab {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-left: 0px;
    }
  }
}

.mobile-select {
  margin: 5px;
}

.mobile-tab {
  margin-top: 20px;
  height: calc(100vh - 180px);

}
</style>
