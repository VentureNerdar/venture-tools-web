<template>
  <n-grid x-gap="10" cols="3">
    <n-gi>
      <h4 class="center-vertically">
        <n-icon :component="Church" :size="20" />

        &nbsp; Planted Churches' Prayers &nbsp;
        <n-tag :bordered="false" size="small" type="info">
          {{ d.prayers.churchPlanterPrayers.length }}
        </n-tag>
      </h4>

      <n-space :size="10" vertical>
        <n-list bordered>
          <n-list-item v-for="c in d.prayers.churchPlanterPrayers">
            <n-space :size="10" vertical>
              <div>
                <b>{{ c.name }}</b>
              </div>

              <div>
                <n-text type="primary">
                  <n-icon :component="PrayingHands" :size="14" /> &nbsp;
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
        <n-icon :component="ChurchRound" :size="20" />
        &nbsp; Assigned Churches' Prayers &nbsp;
        <n-tag :bordered="false" size="small" type="info">
          {{ d.prayers.assignedToChurchPrayers.length }}
        </n-tag>
      </h4>
      <n-space :size="10" vertical>
        <n-list bordered>
          <n-list-item v-for="c in d.prayers.assignedToChurchPrayers">
            <n-space :size="10" vertical>
              <div class="center-vertically">
                <b>{{ c.name }}</b>
              </div>

              <div>
                <n-text type="primary">
                  <n-icon :component="PrayingHands" :size="14" /> &nbsp;
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
        <n-icon :component="PersonRound" :size="20" />
        &nbsp; Assigned Contacts' Prayers &nbsp;
        <n-tag :bordered="false" size="small" type="info">
          {{ d.prayers.assignedToContactPrayers.length }}
        </n-tag>
      </h4>

      <n-space :size="10" vertical>
        <n-list bordered>
          <n-list-item v-for="c in d.prayers.assignedToContactPrayers">
            <n-space :size="10" vertical>
              <div>
                <b>{{ c.name }}</b>
              </div>

              <div>
                <n-text type="primary">
                  <n-icon :component="PrayingHands" :size="14" /> &nbsp;
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

<script lang="ts" setup>
import { ChurchRound, PersonRound } from "@vicons/material"
import { Church, PrayingHands } from "@vicons/fa"

import type { BrowseConditionAll } from "~/types/index.d"
import { RoutePaths } from "~/types/index.d"
import { useConsumeApi } from "~/composables/useConsumeApi"

type Prayers = {
  churchPlanterPrayers: any[]
  assignedToChurchPrayers: any[]
  assignedToContactPrayers: any[]
}

const consume = {
  prayers: useConsumeApi(RoutePaths.SETTINGS_PRAYERS),
}

const d = reactive({
  prayers: {} as Prayers,
  /*
    churchPlanterPrayers: [],
    assignedToChurchPrayers: [],
    assignedtoContactPrayers: [],
  } as Prayers,
  */
})

d.prayers = (await consume.prayers.browse(
  { all: true } as BrowseConditionAll,
  false,
)) as Prayers

console.log(d.prayers)
</script>

<style lang="scss" scoped>
.center-vertically {
  display: flex;
  align-items: center;
}
</style>
