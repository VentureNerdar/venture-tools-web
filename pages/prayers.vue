<template>
  <n-grid
    x-gap="10"
    cols="3"
  >
    <n-gi>
      <h4 class="center-vertically">
        <n-icon
          :component="ChurchRound"
          :size="20"
        />
        &nbsp; {{ h.translate('churches_prayers') }} &nbsp;
        <n-tag
          :bordered="false"
          size="small"
          type="info"
        >
          {{ d.prayers.churchPrayers.length }}
        </n-tag>
      </h4>
      <n-space
        :size="10"
        vertical
      >
        <n-list bordered>
          <n-list-item v-for="c in d.prayers.churchPrayers">
            <n-space
              :size="10"
              vertical
            >
              <div class="center-vertically">
                <b>{{ c.name }}</b>
              </div>

              <div>
                <n-text type="primary">
                  <n-icon
                    :component="PrayingHands"
                    :size="14"
                  /> &nbsp;
                </n-text>

                <n-text :depth="3">
                  {{ c.current_prayers }}
                </n-text>
              </div>
            </n-space>
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>

    <n-gi>
      <h4 class="center-vertically">
        <n-icon
          :component="PersonRound"
          :size="20"
        />
        &nbsp; {{ h.translate('assigned_contacts_prayers') }} &nbsp;
        <n-tag
          :bordered="false"
          size="small"
          type="info"
        >
          {{ d.prayers.contactPrayers.length }}
        </n-tag>
      </h4>

      <n-space
        :size="10"
        vertical
      >
        <n-list bordered>
          <n-list-item v-for="c in d.prayers.contactPrayers">
            <n-space
              :size="10"
              vertical
            >
              <div>
                <b>{{ c.name }}</b>
              </div>

              <div>
                <n-text type="primary">
                  <n-icon
                    :component="PrayingHands"
                    :size="14"
                  /> &nbsp;
                </n-text>

                <n-text :depth="3">
                  {{ c.current_prayers }}
                </n-text>
              </div>
            </n-space>
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script
  lang="ts"
  setup
>
  import { ChurchRound, PersonRound } from "@vicons/material"
  import { Church, PrayingHands } from "@vicons/fa"

  import type { BrowseConditionAll } from "~/types/index.d"
  import { RoutePaths } from "~/types/index.d"
  import { useConsumeApi } from "~/composables/useConsumeApi"
  import { useLanguagesStore } from "~/stores/useLanguagesStore"
  import { useSettingStore } from "~/stores/useSettingsStore"

  type Prayers = {
    churchPrayers: any[]
    contactPrayers: any[]
  }

  const languageStore = useLanguagesStore()
  console.log('Language Words:', {
    storeWords: languageStore.words,
    localStorageWords: JSON.parse(localStorage.getItem('languageWords') || '[]')
  })

  const consume = {
    prayers: useConsumeApi(RoutePaths.SETTINGS_PRAYERS),
  }

  // Language Switching
  const h = useHelpers()
  // e.o Language Switching

  const d = reactive({
    prayers: {} as Prayers,
  })

  d.prayers = (await consume.prayers.browse(
    { all: true } as BrowseConditionAll,
    false,
  )) as Prayers

//    const churchPrayers = computed(() => {
//   const all = [...d.prayers.churchPlanterPrayers, ...d.prayers.assignedToChurchPrayers]
//   const seen = new Set()
//   return all.filter(c => {
//     if (!c?.id) return false
//     if (seen.has(c.id)) return false
//     seen.add(c.id)
//     return true
//   })
// })


  console.log('Prayers:', d.prayers)

</script>

<style
  lang="scss"
  scoped
>
  .center-vertically {
    display: flex;
    align-items: center;
  }
</style>
