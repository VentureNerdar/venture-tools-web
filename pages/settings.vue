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
      <n-tab-pane name="users" :tab="translatedWord('users')" class="tab">
        <SettingsUsers />
      </n-tab-pane>

      <n-tab-pane
        name="communication_Platforms"
        :tab="translatedWord('communication_platforms')"
        class="tab"
      >
        <SettingsCommunicationPlatforms />
      </n-tab-pane>

      <n-tab-pane name="faith_milestones" :tab="translatedWord('faith_milestones')" class="tab">
        <SettingsFaithMilestones />
      </n-tab-pane>

      <n-tab-pane name="people_groups" :tab="translatedWord('people_group')" class="tab">
        <SettingsPeopleGroups />
      </n-tab-pane>

      <n-tab-pane name="denominations" :tab="translatedWord('denominations')" class="tab">
        <SettingsDenominations />
      </n-tab-pane>

      <n-tab-pane
        name="community_checklists"
        :tab="translatedWord('community_checklists')"
        class="tab"
      >
        <SettingsCommunityChecklists />
      </n-tab-pane>

      <n-tab-pane name="languages" :tab="translatedWord('languages')" class="tab">
        <SettingsLanguages />
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>

<script lang="ts" setup>
import { useLanguagesStore } from '~/stores/useLanguagesStore'
import { useSettingStore } from '~/stores/useSettingsStore'

const route = useRoute()
const router = useRouter()

// Language Switching
const words = useLanguagesStore().words
const usrPreferLang = useSettingStore().currentPreferredLanguage
const helpers = useHelpers();
const translatedWord = (key: string) => {
  return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
};
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

<style lang="scss" scoped>
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
