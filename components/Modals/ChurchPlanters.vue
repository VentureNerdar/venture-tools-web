<template>
  <n-space :size="10" vertical>
    <div>Church Planters</div>
    <n-flex justify="space-between">
      <div>
        <n-scrollbar x-scrollable>
          <div style="white-space: nowrap">
            <n-space :size="10" v-if="p.churchPlanters.length > 0">
              <n-tag
                v-for="cp in p.churchPlanters as any"
                type="primary"
                :key="cp.id"
                closable
                @close="m.handle.click.list.users(cp, 'remove')"
              >
                {{ cp.name }}
              </n-tag>
            </n-space>
            <n-text depth="3" v-else><i>No Church Planters</i></n-text>
          </div>
        </n-scrollbar>
      </div>
      <div>
        <n-button
          type="success"
          secondary
          size="tiny"
          @click="m.handle.click.btn.addModel"
        >
          <template #icon>
            <PlusRound />
          </template>
        </n-button>
      </div>
    </n-flex>
  </n-space>

  <n-modal
    v-model:show="d.visibility.modal"
    transform-origin="center"
    @after-leave="m.consume.getDefaultChurchPlanters"
  >
    <n-card
      style="width: 600px"
      :title="d.modal.title"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>

      <n-space vertical :size="10">
        <n-input
          size="small"
          placeholder="Search church planters by name"
          v-model:value="d.value"
          clearable
          @keypress.enter="m.consume.search"
          @clear="m.consume.getDefaultChurchPlanters"
        />

        <n-scrollbar
          style="max-height: calc(100vh - 200px)"
          :size="20"
          :x-scrollable="false"
          :show-scrollbar="true"
        >
          <n-space :size="10" vertical>
            <n-list hoverable>
              <n-list-item v-for="cpl in d.churchPlantersList as any">
                <template #suffix>
                  <n-button
                    v-if="!p.churchPlanters.find((cp: any) => cp.id === cpl.id)"
                    secondary
                    type="success"
                    size="small"
                    @click="m.handle.click.list.users(cpl, 'add')"
                  >
                    <template #icon>
                      <PlusRound />
                    </template>
                  </n-button>

                  <n-button
                    v-else
                    secondary
                    type="error"
                    size="small"
                    @click="m.handle.click.list.users(cpl, 'remove')"
                  >
                    <template #icon>
                      <CloseRound />
                    </template>
                  </n-button>
                </template>

                <n-thing :title="cpl.name">
                  <template #description>
                    <n-text depth="3">
                      <i> @{{ cpl.username }} </i>
                    </n-text>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </n-space>
        </n-scrollbar>
      </n-space>

      <template #footer>
        <n-flex justify="end">
          <n-space :size="10">
            <n-button
              type="default"
              size="small"
              @click="m.handle.click.btn.close"
            >
              Close
            </n-button>
          </n-space>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { PlusRound, CloseRound } from "@vicons/material"
import { useConsumeApi } from "~/composables/useConsumeApi"
import { RoutePaths, type BrowseConditionAll } from "~/types/index.d"

const p = defineProps<{
  churchPlanters: any[]
}>()

const emit = defineEmits(["addedChurchPlanter", "removedChurchPlanter"])

const consume = {
  churchPlanter: useConsumeApi(RoutePaths.USERS),
}

const d = reactive({
  value: "",
  churchPlantersList: [],
  visibility: {
    modal: false,
  },

  addedChurchPlanters: [] as any,

  modal: {
    title: "Add Church Planter",
  },
})

const m = {
  handle: {
    click: {
      btn: {
        addModel: () => {
          d.visibility.modal = true
        },

        close: () => {
          d.value = ""
          d.visibility.modal = false
        },
      },

      list: {
        users: (user: any, op: "remove" | "add") => {
          emit(
            op === "add" ? "addedChurchPlanter" : "removedChurchPlanter",
            user,
          )

          if (op === "add") {
            d.addedChurchPlanters.push(user)
          } else {
            d.addedChurchPlanters = d.addedChurchPlanters.filter(
              (cp: any) => cp.id !== user.id,
            )
          }
        },
      },
    },
  },

  consume: {
    search: async () => {
      const bc = {
        all: true,
        search: d.value,
        search_by: "name",
        limit: 20,
        where: JSON.stringify([{ key: "user_role_id", value: 4 }]),
      } as BrowseConditionAll

      d.churchPlantersList = await consume.churchPlanter.browse(bc, false)
    },

    getDefaultChurchPlanters: async () => {
      const bc = {
        all: true,
        limit: 20,
        where: JSON.stringify([{ key: "user_role_id", value: 4 }]),
      } as BrowseConditionAll

      d.churchPlantersList = await consume.churchPlanter.browse(bc, false)
    },
  },
}

m.consume.getDefaultChurchPlanters()
</script>

<style lang="scss" scoped></style>
