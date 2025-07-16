<template>
  <div>
    <h1 style="margin-top: 0px; color: #17badf">
      {{ h.translate("our_progress") }}
    </h1>

    <n-space
      vertical
      :size="30"
    >
      <n-grid
        x-gap="10"
        :cols="6"
      >
        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number main">{{ insightData.church_count }}</div>

            <div class="label">{{ h.translate("churches_planted") }}</div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number main">65</div>

            <div class="label">{{ h.translate("people_groups") }}</div>
          </n-card>
        </n-gi>
      </n-grid>

      <n-grid
        x-gap="10"
        :cols="6"
      >
        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">{{ insightData.avg_church_size }}</div>

            <div class="label">{{ h.translate("church_size_avg") }}</div>
          </n-card>
        </n-gi>

        <!-- <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">45,000</div>

            <div class="label">Believers</div>
          </n-card>
        </n-gi> -->

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">{{ insightData.contact_baptized_count }}</div>

            <div class="label">{{ h.translate("baptized") }}</div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">{{ insightData.provinces }}</div>

            <div class="label">{{ h.translate("provinces") }}</div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">{{ insightData.districts }}</div>

            <div class="label">{{ h.translate("districts") }}</div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">{{ insightData.communities }}</div>

            <div class="label">{{ h.translate("communities") }}</div>
          </n-card>
        </n-gi>
      </n-grid>

      <div />

      <h1 style="margin-top: 0px; margin-bottom: 0; color: #17badf">
        <PlusRound style="width: 20px" /> {{ h.translate("add_information") }}
      </h1>

      <n-space :size="10">
        <n-button
          size="large"
          type="primary"
          ghost
          @click="router.push('/contacts')"
        >
          <template #icon>
            <PersonRound />
          </template>

          {{ h.translate("contact") }}
        </n-button>

        <n-button
          size="large"
          type="primary"
          ghost
          @click="router.push('/churches')"
        >
          <template #icon>
            <ChurchRound />
          </template>

          {{ h.translate("church") }}
        </n-button>

        <n-button
          size="large"
          type="primary"
          ghost
          @click="router.push('/communities')"
        >
          <template #icon>
            <GroupRound />
          </template>

          {{ h.translate("community") }}
        </n-button>
      </n-space>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import {
  PlusRound,
  PersonRound,
  ChurchRound,
  GroupRound,
} from "@vicons/material"

import { RoutePaths } from "~/types/index.d"
import type { InsightFormModel } from "~/types/models"

const h = useHelpers()
const router = useRouter()

const consume = useConsumeApi(RoutePaths.DASHBOARD_INSIGHT)

const insightData: InsightFormModel = await consume.browse({
  all: true,
})
</script>

<style scoped lang="scss">
.metrics {
  .number {
    font-size: 18px;
    font-weight: bold;
    color: #17badf;

    &.main {
      font-size: 32px;
    }
  }

  .label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>
