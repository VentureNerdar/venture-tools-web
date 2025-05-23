<template>
  <div class="wrap">
    <div style="text-align: center">
      <div :class="`brand-logo ${d.logoLoaded ? 'loaded' : ''}`">
        VENTURE TOOLS
      </div>
      <div class="loading-text">L O A D I N G</div>
      <n-spin size="small" />
    </div>
  </div>

  <div class="load-list">
    <div v-if="d.completedModules.length > 0">
      <div
        v-for="module in d.completedModules"
        :key="module"
      >
        <n-icon>
          <n-text type="success">
            <CheckRound />
          </n-text>
        </n-icon>
        {{ module }}
      </div>
    </div>

    <div>
      {{ d.currentTaskText }}
    </div>

    <div style="clear: both"></div>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { CheckRound } from "@vicons/material"
  import { useConsumeApi } from "~/composables/useConsumeApi"
  import {
    RoutePaths,
    type BrowseCondition,
    type LanguageFormModel,
    type StoreOptions,
  } from "~/types/index.d"

  import { useAuthStore } from "~/stores/useAuthStore"
  import { useUserStore } from "~/stores/useUsersStore"
  import { useLanguagesStore } from "~/stores/useLanguagesStore"
  import { useSettingStore } from "~/stores/useSettingsStore"
  import { usePeopleGroupStore } from "~/stores/usePeopleGroupsStore"
  import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformsStore"
  import { useCommunityStore } from "~/stores/useCommunitiesStore"
import { useFaithMilestoneStore } from "~/stores/useFaithMilestonesStore"

  type ModuleNameType =
    | "User Roles"
    | "Languages"
    | "Language Words"
    | "Statuses"
    | "People Groups"
    | "Communication Platforms"
    | "Community Checklists"

  type Task = [ModuleNameType, RoutePaths, string, StoreOptions, BrowseCondition]

  definePageMeta({
    // middleware: "guest",
    layout: "non-app",
  })

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  const router = useRouter()

  const d = reactive({
    completedModules: [] as string[],
    currentTaskText: "",

    defaultStoreOptions: {
      isPersist: true,
    } as StoreOptions,

    stores: {
      user: useUserStore(),
      languages: useLanguagesStore(),
      settings: useSettingStore(),
    },

    logoLoaded: false,
  })

  const query = { all: true } as BrowseCondition
  const tasks: Task[] = [
    [
      "User Roles",
      RoutePaths.USERS_ROLES,
      "userRoles",
      {
        ...d.defaultStoreOptions,
        key: "userRoles",
        storeState: useUserStore().userRoles,
      } as StoreOptions,
      {
        ...query,
        /*
        whereNotIn: {
          key: "id",
          value: [ 2],
        },
        */
      },
    ],

    [
      "Languages",
      RoutePaths.LANGUAGES,
      "languages",
      {
        ...d.defaultStoreOptions,
        key: "languages",
        storeState: useLanguagesStore().languages,
      } as StoreOptions,
      // query,
      {
        ...query,
        with: JSON.stringify(["translations"]),
      },
    ],

    [
      "Language Words",
      RoutePaths.LANGUAGE_WORDS,
      "languageWords",
      {
        ...d.defaultStoreOptions,
        key: "languageWords",
        storeState: useLanguagesStore().words,
      } as StoreOptions,
      query,
    ],

    [
      "Statuses",
      RoutePaths.SETTINGS_STATUSES,
      "statuses",
      {
        ...d.defaultStoreOptions,
        key: "statuses",
        storeState: useSettingStore().statuses,
      } as StoreOptions,
      query,
    ],

    [
      "People Groups",
      RoutePaths.PEOPLE_GROUPS,
      "peopleGroups",
      {
        ...d.defaultStoreOptions,
        key: "peopleGroups",
        storeState: usePeopleGroupStore().peopleGroups,
      } as StoreOptions,
      query,
    ],

    [
      "Communication Platforms",
      RoutePaths.COMMUNICATION_PLATFORMS,
      "communicationPlatforms",
      {
        ...d.defaultStoreOptions,
        key: "communicationPlatforms",
        storeState: useCommunicationPlatformStore().communicationPlatforms,
      } as StoreOptions,
      query,
    ],

    [
      "Community Checklists",
      RoutePaths.COMMUNITY_CHECKLISTS,
      "communityChecklists",
      {
        ...d.defaultStoreOptions,
        key: "communityChecklists",
        storeState: useCommunityStore().communityChecklists,
      } as StoreOptions,
      query,
    ],
  ]

const s = reactive({
  faithMilestoneStore: useFaithMilestoneStore(),
  settings: useSettingStore(),
  peopleGroupStore: usePeopleGroupStore(),
  languageStore: useLanguagesStore(),
  communicationPlatformStore: useCommunicationPlatformStore(),
  userStore: useUserStore()
})



  const downloadSequence = async () => {
    for (const [moduleName, model, key, store, query] of tasks) {
      d.currentTaskText = `Fetching ${moduleName}...`
      const response = await consume(moduleName, model, query, store)

      if (moduleName === 'Languages') {
        const languages = JSON.parse(localStorage.getItem('languages') || "[]")
        const settingStore = useSettingStore()
        let defaultLang
        if (languages) {
          defaultLang = languages.find((l: LanguageFormModel) => l.locale === 'en')
          settingStore.setUserPreferredLanguage(defaultLang)
        }
      }
          if (moduleName === 'Statuses') {
      const statuses = JSON.parse(localStorage.getItem('statuses') || "[]")
      s.settings.setStatuses(statuses)
    }
    // if (moduleName === 'Faith Milestones') {
    //   const faithMilestoneValues = JSON.parse(localStorage.getItem('faithMilestones') || "[]")
    //   s.faithMilestoneStore.setFaithMilestones(faithMilestoneValues)
    // }
    if (moduleName === 'People Groups') {
      const peopleGroupValues = JSON.parse(localStorage.getItem('peopleGroups') || "[]")
      s.peopleGroupStore.setPeopleGroups(peopleGroupValues)
    }
    if (moduleName === 'Language Words') {
      const wordValues = JSON.parse(localStorage.getItem('languageWords') || "[]")
      s.languageStore.setWords(wordValues)
    }
    if (moduleName === 'Languages') {
      const languageValues = JSON.parse(localStorage.getItem('languages') || "[]")
      s.languageStore.setLanguages(languageValues)
    }
    if (moduleName === 'Communication Platforms') {
      const communicationPlatformValues = JSON.parse(localStorage.getItem('communicationPlatforms') || "[]")
      s.communicationPlatformStore.setCommunicationPlatforms(communicationPlatformValues)
    }
    if (moduleName === 'User Roles') { 
      const userRoleValues = JSON.parse(localStorage.getItem('userRoles') || "[]")
      s.userStore.setUserRoles(userRoleValues)

    }


      await delay(200)

      if (!d.logoLoaded) {
        d.logoLoaded = true
      }
    }

    redirectNextPage()
  }

  const redirectNextPage = () => {
    const role = useAuthStore().authUser.user_role_id
    let page = "/dashboard"

    // if user is a church planter
    if (role === 4 || role === 3) {
      page = "/prayers"
    }

    router.push(page)
  }

  const consume = async (
    moduleName: ModuleNameType,
    routePaths: RoutePaths,
    query: BrowseCondition,
    storeOptions: StoreOptions,
  ) => {
    const consumer = useConsumeApi(routePaths)
    const response = await consumer.browse(query, storeOptions)
    d.completedModules.push(moduleName)

    if (moduleName === "Community Checklists") {
      d.currentTaskText = "Redirecting . . . "
    }

    return response
  }

  downloadSequence()
</script>

<style
  lang="scss"
  scoped
>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .brand-logo {
    color: #17badf;
    font-weight: 900;
    font-size: 2.5em;
    transition: all 6s ease-out;
    letter-spacing: 4px;

    &.loaded {
      letter-spacing: 0px;
    }
  }

  .loading-text {
    margin-bottom: 20px;
    opacity: 0.7;
  }

  .load-list {
    position: absolute;
    left: 20px;
    bottom: 20px;

    opacity: 0.5;
    transition: all 1s ease-in-out;

    min-width: 250px;

    &:hover {
      opacity: 1;
    }
  }
</style>
