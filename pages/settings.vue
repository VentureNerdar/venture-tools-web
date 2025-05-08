<template>
  <n-space vertical>
    <n-tabs
      type="card"
      animated
      placement="left"
      :value="d.currentTab"
      style="height: calc(100vh - 100px)"
      @update:value="m.handleTabChange"
    >
      <n-tab-pane
        name="users"
        :tab="h.translate('users')"
        class="tab"
      >
        <SettingsUsers />
      </n-tab-pane>

      <n-tab-pane
        name="communication_Platforms"
        :tab="h.translate('communication_platforms')"
        class="tab"
      >
        <SettingsCommunicationPlatforms />
      </n-tab-pane>

      <n-tab-pane
        name="faith_milestones"
        :tab="h.translate('faith_milestones')"
        class="tab"
      >
        <SettingsFaithMilestones />
      </n-tab-pane>

      <n-tab-pane
        name="people_groups"
        :tab="h.translate('people_group')"
        class="tab"
      >
        <SettingsPeopleGroups />
      </n-tab-pane>

      <n-tab-pane
        name="denominations"
        :tab="h.translate('denominations')"
        class="tab"
      >
        <SettingsDenominations />
      </n-tab-pane>

      <n-tab-pane
        name="community_checklists"
        :tab="h.translate('community_checklists')"
        class="tab"
      >
        <SettingsCommunityChecklists />
      </n-tab-pane>

      <n-tab-pane
        name="languages"
        :tab="h.translate('languages')"
        class="tab"
      >
        <SettingsLanguages />
      </n-tab-pane>

      <n-tab-pane
        name="notifications"
        tab="Notification"
        class="tab"
      >
        <SettingsNotifications />
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>

<script
  lang="ts"
  setup
>

  const route = useRoute()
  const router = useRouter()

  // Language Switching
  const h = useHelpers()
  // e.o Language Switching

  const d = reactive({
    currentTab: route.query.settingType as string,
  })

  if (!("settingType" in route.query)) {
    router.push({ query: { settingType: "users" } })
  }

  const m = {
    handleTabChange(tab: string) {
      d.currentTab = tab
      router.push({ query: { settingType: tab } })
    },
  }

  watch(
    () => route.query.settingType,
    (settingType) => {
      d.currentTab = settingType as string
    },
  )
</script>

<style
  lang="scss"
  scoped
>
  html {
    .tab {
      border: 1px solid rgba(0, 0, 0, 0.09);
      border-radius: 0 4px 4px 0;
      border-left: 0px;
      padding: 10px;
    }

    &.dark {
      .tab {
        border-color: rgba(255, 255, 255, 0.08);
        padding: 10px;
      }
    }
  }
</style>
