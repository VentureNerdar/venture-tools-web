<template>
  <div>
    <h1 style="margin-top: 0px; color: #17badf; margin-left: 10px;">
      {{ h.translate("our_progress") }}
    </h1>

    <n-space
      vertical
      :size="30"
      style="padding: 10px;"
    >
      <n-grid
        x-gap="10"
        :cols="isMobile ? 2 : 6"
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
            <div class="number main">{{ insightData.people_groups }}</div>

            <div class="label">{{ h.translate("people_groups") }}</div>
          </n-card>
        </n-gi>
      </n-grid>

      <n-grid
        x-gap="10"
        y-gap="10"
        :cols="isMobile ? 2 : 6"
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
            <div class="number">{{ insightData.baptized_member_count }}</div>

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

      <n-space
        :size="10"
        :vertical="isMobile"
      >
        <n-button
          size="large"
          type="primary"
          ghost
          @click="d.visibility.contactForm = true"
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
          @click="d.visibility.churchForm = true"
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
          @click="d.visibility.communityForm = true"
        >
          <template #icon>
            <GroupRound />
          </template>

          {{ h.translate("community") }}
        </n-button>
      </n-space>
    </n-space>
    <ModalsGenericSaveForm
      :show-modal="d.visibility.contactForm"
      :form-modal-options="d.contactFormModalOptions"
      :form="false"
      :store-options="d.contactStoreOption"
      :route-path="RoutePaths.CONTACTS"
      @close-modal="d.visibility.contactForm = false"
    />
    <ModalsGenericSaveForm
      :show-modal="d.visibility.churchForm"
      :form-modal-options="d.churchFormModalOptions"
      :form="false"
      :store-options="d.churchStoreOption"
      :route-path="RoutePaths.CHURCHES"
      @close-modal="d.visibility.churchForm = false"
      @saved-form="m.handle.emits.handleSavedChurchForm"
    />
    <ModalsGenericSaveForm
      :show-modal="d.visibility.communityForm"
      :form-modal-options="d.communityFormModalOptions"
      :form="false"
      :store-options="d.communityStoreOption"
      :route-path="RoutePaths.COMMUNITIES"
      @close-modal="d.visibility.communityForm = false"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  PlusRound,
  PersonRound,
  ChurchRound,
  GroupRound,
} from "@vicons/material"
import type { FormModalOptions, StoreOptions } from "~/types/index.d"
import { RoutePaths } from "~/types/index.d"
import type { InsightFormModel } from "~/types/models"
import modules, { type Module } from "~/utils/modules"

type DType = {
  visibility: {
    churchForm: boolean
    contactForm: boolean
    communityForm: boolean
  }
  churchStoreOption: StoreOptions
  churchFormModalOptions: FormModalOptions
  contactStoreOption: StoreOptions
  contactFormModalOptions: FormModalOptions
  communityStoreOption: StoreOptions
  communityFormModalOptions: FormModalOptions
}

const h = useHelpers()
const screenSize = useScreenSize()
const isMobile = screenSize.isMobile

const d = reactive({
  visibility: {
    churchForm: false,
    contactForm: false,
    communityForm: false,
  },
  ...createModalConfig(modules.churches as Module, "church"),
  ...createModalConfig(modules.contacts as Module, "contact"),
  ...createModalConfig(modules.communities as Module, "community"),
}) as DType

function createModalConfig(module: Module, prefix: string) {
  return {
    [`${prefix}StoreOption`]: {
      storeState: module.store[module.name],
      ...module.options.store,
    } as StoreOptions,
    [`${prefix}FormModalOptions`]: {
      moduleName: module.name,
      components: {
        formComponent: module.form.component,
        buttonIconComponent: module.form.createButtonIconComponent,
      },
      routePath: module.routePath,
      width: module.form.modalWidthSize,
      hiddenFieldsOnEdit: module.dataTable.hiddenFieldsOnEdit,
      form: module.form.model,
    } as FormModalOptions,
  }
}

const m = {
  handle: {
    emits: {
      handleSavedChurchForm: (form: any) => {
        console.log("form", form)
      },
    },
  },
}

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
