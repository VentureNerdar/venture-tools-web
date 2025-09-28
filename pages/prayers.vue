<template>
  <div v-if="isMobile">
    <PrayerMobile
      :d="d"
      :m="m"
      :h="h"
      :hasMore="hasMore"
    />
  </div>
  <div v-else>
    <PrayerDesktop
      :d="d"
      :m="m"
      :h="h"
      :hasMore="hasMore"
    />
  </div>
</template>

<script lang="ts" setup>
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
const { isMobile } = useScreenSize()
console.log("Language Words:", {
  storeWords: languageStore.words,
  localStorageWords: JSON.parse(localStorage.getItem("languageWords") || "[]"),
})

const consume = {
  prayers: useConsumeApi(RoutePaths.SETTINGS_PRAYERS),
  churchPrayerCount: useConsumeApi(RoutePaths.CHURCH_PRAYER_COUNT),
  contactPrayerCount: useConsumeApi(RoutePaths.CONTACT_PRAYER_COUNT),
}

// Language Switching
const h = useHelpers()
const limit = ref(2)
const hasMore = ref(true)
// e.o Language Switching

const d = reactive({
  prayers: {} as Prayers,
})

const m = {
  handle: {
    click: {
      contactPrayerCount: async (contact: any) => {
        if (contact.user_has_prayed) return
        const res = await consume.contactPrayerCount.save({
          contact_id: contact.id,
        })
        if (res) {
          contact.user_has_prayed = true
          contact.prayer_count += 1
        }
      },

      churchPrayerCount: async (church: any) => {
        if (church.user_has_prayed) return
        const res = await consume.churchPrayerCount.save({
          church_id: church.id,
        })
        if (res) {
          church.user_has_prayed = true
          church.prayer_count += 1
        }
      },

      formattedPrayerCount: (item: any) => {
        if (item.user_has_prayed) {
          if (item.prayer_count === 1) return "You prayed for this"
          if (item.prayer_count === 2) return "You and 1 other prayed for this"
          return `You and ${item.prayer_count - 1} others prayed for this`
        } else {
          if (item.prayer_count === 1) return "1 person prayed for this"
          if (item.prayer_count === 0) return "No one prayed for this"
          return `${item.prayer_count} people prayed for this`
        }
      },

      loadMore: async () => {
        limit.value += limit.value
        const newData = await m.handle.fetchPrayers()
        if (
          d.prayers.churchPrayers.length == newData.churchPrayers.length &&
          d.prayers.contactPrayers.length == newData.contactPrayers.length
        ) {
          hasMore.value = false
          return
        }
        d.prayers.churchPrayers = newData.churchPrayers
        d.prayers.contactPrayers = newData.contactPrayers
      },
    },
    fetchPrayers: async () => {
      const res = await consume.prayers.browse(
        {
          with: JSON.stringify(limit.value),
        } as BrowseConditionAll,
        false,
      )
      return res as Prayers
    },
  },
}


d.prayers = (await m.handle.fetchPrayers()) as Prayers

console.log("Prayers:", d.prayers)
</script>

<style lang="scss" scoped>
.center-vertically {
  display: flex;
  align-items: center;
}

.praying-hands {
  cursor: pointer;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
