<template>
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
        <!-- <SettingsCommunications /> -->
      </n-tab-pane>

      <n-tab-pane
        name="generational_churches"
        :tab="h.translate('generational_churches')"
        class="tab"
      >
        <!-- <SettingsFaithMilestones /> -->
      </n-tab-pane>

      <n-tab-pane
        name="people_groups"
        :tab="h.translate('people_groups')"
        class="tab"
      >
        <!-- <SettingsPeopleGroups /> -->
      </n-tab-pane>

    </n-tabs>
  </n-space>
</template>

<script
  setup
  lang="ts"
>
  const route = useRoute()
  const router = useRouter()

  // Language Switching
  const h = useHelpers()
  // e.o Language Switching

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

<style
  lang="scss"
  scoped
>
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
</style>
