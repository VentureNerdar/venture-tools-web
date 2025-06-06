<template>
  <div>
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

        <n-space
          vertical
          :size="10"
        >
          <n-form
            ref="formRef"
            :model="formData"
            :rules="rules"
          >
            <n-form-item
              path="church_id"
              :label="h.translate('church')"
            >
              <n-select
                @search="m.handle.click.searchChurchesOption"
                v-model:value="d.churchID"
                placeholder="Select Church"
                filterable
                clearable
                remote
                :options="d.options.churches"
              />
            </n-form-item>
          </n-form>
          <n-input
            size="small"
            :placeholder="h.translate('search_church_planters_by_name')"
            v-model:value="d.value"
            clearable
            @keypress.enter="m.consume.search"
            @clear="m.consume.getDefaultChurchPlanters"
          />

          <n-scrollbar
            style="max-height: calc(100vh - 250px)"
            :size="20"
            :x-scrollable="false"
            :show-scrollbar="true"
          >
            <n-space
              :size="10"
              vertical
            >
              <n-list hoverable>
                <n-list-item v-for="cpl in churchPlantersList">
                  <template #suffix>
                    <n-button
                      v-if="
                        !d.addedChurchPlanters.find(
                          (cp: any) => cp.id === cpl.id,
                        )
                      "
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
                      type="success"
                      size="small"
                      @click="m.handle.click.list.users(cpl, 'remove')"
                    >
                      <template #icon>
                        <DoneFilled />
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
                {{ h.translate("close") }}
              </n-button>
              <n-button
                type="primary"
                size="small"
                @click="m.handle.click.btn.save"
              >
                {{ h.translate("save") }}
              </n-button>
            </n-space>
          </n-flex>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {
  RoutePaths,
  type BrowseConditionAll,
  type ChurchFormModel,
} from "~/types/index.d"
import {
  PlusRound,
  CloseRound,
  DoneAllRound,
  DoneFilled,
} from "@vicons/material"
import type { FormInst } from "naive-ui"

const p = withDefaults(
  defineProps<{
    churchPlanters: any[]
    showModal: boolean
    communityID: number
  }>(),
  {
    churchPlanters: () => [],
    showModal: false,
    communityID: 0,
  },
)

const h = useHelpers()

const emit = defineEmits([
  "addedChurchPlanter",
  "removedChurchPlanter",
  "closeModal",
])

const selectedChurchPlanters = ref<number[]>([])
const formData = ref<{
  church_id: number | null
  church_planters: number[]
}>({
  church_id: null,
  church_planters: [],
})

const d = reactive({
  value: "",
  churchPlantersList: [],
  churchID: null,

  loading: {
    churches: false,
  },
  visibility: {
    modal: false,
  },
  modal: {
    title: h.translate("add_church_planter"),
  },
  options: {
    churches: [] as any[],
  },

  addedChurchPlanters: [] as any,
})

const consume = {
  churchPlanter: useConsumeApi(RoutePaths.USERS),
  churches: useConsumeApi(RoutePaths.CHURCHES),
}

const churchPlantersList = computed(() => {
  return d.churchPlantersList as any[]
})

onMounted(() => {
  d.addedChurchPlanters = p.churchPlanters
})

const rules = {
  church_id: {
    required: true,
    message: "Please select a church",
    trigger: ["blur", "change"],
    validator: (rule: any, value: any) => {
      return !!value
    },
  },
}

const formRef = ref<FormInst | null>(null)

const m = {
  handle: {
    click: {
      btn: {
        close: () => {
          d.value = ""
          d.visibility.modal = false
          emit("closeModal")
        },
        save: async () => {
          try {
            formData.value.church_id = d.churchID
            await formRef.value?.validate()
            formData.value.church_planters = selectedChurchPlanters.value
            const consume = useConsumeApi(RoutePaths.CHURCH_PLANTERS)
            const res = await consume.save(formData.value)
            if (res) {
              d.visibility.modal = false
            }
          } catch (error) {
            console.error("Validation error:", error)
          }
        },
      },
      list: {
        users: (user: any, op: "remove" | "add") => {
          if (op === "add") {
            if (!d.churchID) {
              // message.error('Please select a church first')
              return
            }
            d.addedChurchPlanters.push(user)
            selectedChurchPlanters.value.push(user.id)
          } else {
            return
            // d.addedChurchPlanters = d.addedChurchPlanters.filter(
            //   (cp: any) => cp.id !== user.id,
            // )
            // selectedChurchPlanters.value = selectedChurchPlanters.value.filter(
            //   (id: number) => id !== user.id
            // )
          }
          emit(
            op === "add" ? "addedChurchPlanter" : "removedChurchPlanter",
            user,
          )
        },
      },
      searchChurchesOption: async (query: string) => {
        d.loading.churches = true

        const searchResult = await consume.churches.browse(
          {
            all: true,
            search_by: "name",
            search: query,
          },
          false,
        )

        d.options.churches = [
          ...searchResult.map((church: any) => ({
            label: church.name,
            value: church.id,
          })),
        ]

        d.loading.churches = false
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

    defaultCommunityChurchesOptions: async () => {
      const bc = {
        all: true,
        limit: 20,
        where: JSON.stringify([{ key: "community_id", value: p.communityID }]),
      } as BrowseConditionAll

      let churches = await consume.churches.browse(bc, false)
      churches = churches.map((church: ChurchFormModel) => {
        return {
          value: church.id,
          label: church.name,
        }
      })
      d.options.churches = churches
    },
  },
}

m.consume.getDefaultChurchPlanters()
// m.consume.defaultChurchesForChurchesOption()
m.consume.defaultCommunityChurchesOptions()
watch(
  () => p.showModal,
  (val) => {
    d.visibility.modal = val
  },
)
</script>
