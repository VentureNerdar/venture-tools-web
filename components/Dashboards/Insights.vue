<template>
  <div>
    <h1 style="margin-top: 0px; color: #17badf;">OUR PROGRESS</h1>

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
            <div class="number main">
              9683
            </div>

            <div class="label">
              Churches Planted
            </div>

          </n-card>

        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number main">
              65
            </div>

            <div class="label">
              People Groups
            </div>
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
            <div class="number">
              120
            </div>

            <div class="label">
              Church Size Avg.
            </div>

          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">
              45,000
            </div>

            <div class="label">
              Believers
            </div>

          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">
              12,000
            </div>

            <div class="label">
              Baptized
            </div>

          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">
              7
            </div>

            <div class="label">
              Provinces
            </div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">
              77
            </div>

            <div class="label">
              Districts
            </div>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            size="small"
            class="metrics"
          >
            <div class="number">
              14,000
            </div>

            <div class="label">
              Communities
            </div>
          </n-card>
        </n-gi>

      </n-grid>

      <div />

      <h1 style="margin-top: 0px; margin-bottom: 0; color: #17badf;">
        <PlusRound style="width: 20px;" /> ADD INFORMATION
      </h1>

      <n-space :size="10">
        <n-button
          size="large"
          type="primary"
          ghost
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

<script
  lang="ts"
  setup
>
  import {
    PlusRound,
    PersonRound,
    ChurchRound,
    GroupRound,
  } from '@vicons/material'

  const h = useHelpers()

</script>

<style
  scoped
  lang="scss"
>
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