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
        &nbsp; {{ h.translate("churches_prayers") }} &nbsp;
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
                <n-text :depth="3">
                  {{ c.current_prayers }}
                </n-text>
              </div>
              <div>
                <n-text :type="c.user_has_prayed ? 'primary' : 'secondary'">
                  <n-icon
                    :component="PrayingHands"
                    :size="16"
                    class="praying-hands"
                    @click="m.handle.click.churchPrayerCount(c)"
                  />
                  &nbsp {{ m.handle.click.formattedPrayerCount(c) }}
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
        &nbsp; {{ h.translate("assigned_contacts_prayers") }} &nbsp;
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
                <n-text :depth="3">
                  {{ c.current_prayers }}
                </n-text>
              </div>
              <div>
                <n-text :type="c.user_has_prayed ? 'primary' : 'secondary'">
                  <n-icon
                    :component="PrayingHands"
                    :size="16"
                    class="praying-hands"
                    @click="m.handle.click.contactPrayerCount(c)"
                  />
                  &nbsp {{ m.handle.click.formattedPrayerCount(c) }} &nbsp
                </n-text>
              </div>
            </n-space>
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>
  </n-grid>
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
    },
  },
}

d.prayers = (await consume.prayers.browse(
  { all: true } as BrowseConditionAll,
  false,
)) as Prayers

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
</style>
