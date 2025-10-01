<template>
  <div>
    <div v-if="!isMobile">
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
            name="communication_platforms"
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
            :tab="h.translate('notifications')"
            class="tab"
          >
            <SettingsNotifications />
          </n-tab-pane>

          <n-tab-pane
            name="movements"
            :tab="h.translate('movements')"
            class="tab"
          >
            <SettingsMovements />
          </n-tab-pane>

          <n-tab-pane
            name="prayer_prompts"
            :tab="h.translate('prayer_prompts') !== '' ? h.translate('prayer_prompts') : 'Prayer Prompts'"
            class="tab"
          >
            <SettingsPrayerPrompts />
          </n-tab-pane>
          <n-tab-pane
            name="ishare"
            tab="iShare API"
            class="tab"
          >
            <SettingsIShare />
          </n-tab-pane>
        </n-tabs>
      </n-space>
    </div>

    <div v-else>
      <div class="mobile-select">
        <n-select
          size="small"
          v-model:value="value"
          :options="options"
          @update:value="m.handleTabChange"
        />
      </div>

      <div class="mobile-tab">
        <SettingsUsers v-if="d.currentTab === 'users'" />
        <SettingsCommunicationPlatforms v-else-if="d.currentTab === 'communication_platforms'" />
        <SettingsFaithMilestones v-else-if="d.currentTab === 'faith_milestones'" />
        <SettingsPeopleGroups v-else-if="d.currentTab === 'people_groups'" />
        <SettingsDenominations v-else-if="d.currentTab === 'denominations'" />
        <SettingsCommunityChecklists v-else-if="d.currentTab === 'community_checklists'" />
        <SettingsLanguages v-else-if="d.currentTab === 'languages'" />
        <SettingsNotifications v-else-if="d.currentTab === 'notifications'" />
        <SettingsMovements v-else-if="d.currentTab === 'movements'" />
        <SettingsPrayerPrompts v-else-if="d.currentTab === 'prayer_prompts'" />
        <SettingsIShare v-else-if="d.currentTab === 'ishare'" />
      </div>
    </div>
  </div>

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
  const value = ref('users')

  const options = [
    { label: h.translate("users"), value: "users" },
    { label: h.translate("communication_platforms"), value: "communication_platforms" },
    { label: h.translate("faith_milestones"), value: "faith_milestones" },
    { label: h.translate("people_groups"), value: "people_groups" },
    { label: h.translate("denominations"), value: "denominations" },
    { label: h.translate("community_checklists"), value: "community_checklists" },
    { label: h.translate("languages"), value: "languages" },
    { label: h.translate("notifications"), value: "notifications" },
    { label: h.translate("movements"), value: "movements" },
    { label: h.translate("prayer_prompts"), value: "prayer_prompts" },
    { label: h.translate("ishare"), value: "ishare" },
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

  .mobile-select {
    margin: 5px;
  }

  .mobile-tab {
    /* margin-top: 20px; */
  }
</style>