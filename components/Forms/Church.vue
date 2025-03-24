<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="rules"
    label-placement="top"
    size="small"
    label-width="150px"
  >
    <n-space :size="10" vertical>
      <n-card size="small">
        <n-grid x-gap="10" :cols="4">
          <n-gi>
            <n-form-item path="is_active" label="Is Active">
              <n-switch v-model:value="d.model.is_active"></n-switch>
            </n-form-item>
          </n-gi>

          <n-gi>
            <n-form-item path="assigned_to" label="Assigned To">
              <n-select
                :loading="d.loading.assignedTo"
                filterable
                clearable
                remote
                @search="m.handle.searchAssignedToOption"
                v-model:value="d.model.assigned_to"
                :options="d.options.assignedTo as any[]"
              >
                <template #action>
                  <n-text :depth="3">
                    Loading maximum 20 users. Type in the name of the user to
                    search.
                  </n-text>
                </template>
              </n-select>
            </n-form-item>
          </n-gi>

          <n-gi>
            <!-- Parent Church -->
            <n-form-item path="community_id" label="Community">
              <n-select
                v-model:value="d.model.community_id"
                placeholder="Select a community"
                filterable
                clearable
                remote
                @search="m.handle.searchCommunityOption"
                :loading="d.loading.community"
                :options="d.options.communities"
              />
            </n-form-item>
          </n-gi>

          <n-gi>
            <ModalsChurchPlanters
              :churchPlanters="d.model.church_planters"
              @added-church-planter="m.handle.emit.addedChurchPlanter"
              @removed-church-planter="m.handle.emit.removedChurchPlanter"
            />
          </n-gi>
        </n-grid>
      </n-card>

      <n-card size="small">
        <n-grid :cols="5" x-gap="10">
          <n-gi span="2">
            <!-- Name -->
            <n-form-item path="name" label="Church Name">
              <n-input
                v-model:value="d.model.name"
                placeholder="Enter church name"
              />
            </n-form-item>
            <!-- e.o Name -->

            <!-- Description -->
            <n-form-item path="description" label="Description">
              <n-input
                v-model:value="d.model.description"
                type="textarea"
                :rows="4"
              />
            </n-form-item>
            <!-- e.o Description -->
          </n-gi>

          <n-gi>
            <!-- Parent Church -->
            <n-form-item path="parent_church_id" label="Parent Church">
              <n-select
                v-model:value="d.model.parent_church_id"
                placeholder="Select a parent church if any"
                filterable
                clearable
                remote
                @search="m.handle.searchChurchesOption"
                :loading="d.loading.coachedBy"
                :options="d.options.churches"
              />
            </n-form-item>
            <!-- e.o Parent Church -->

            <!-- Website -->
            <n-form-item path="website" label="Church Website">
              <n-input
                v-model:value="d.model.website"
                placeholder="Enter church website"
              />
            </n-form-item>
            <!-- e.o Website -->

            <!-- Founded At -->
            <n-form-item path="founded_at" label="Founded At">
              <n-date-picker
                v-model:value="d.model.founded_at"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="dd MMM yyyy"
                placeholder="Select a date"
                style="width: 100%"
                :input-readonly="true"
              />
            </n-form-item>
          </n-gi>

          <n-gi>
            <!-- Denomination -->
            <n-form-item path="denomination" label="Denomination">
              <n-select
                v-model:value="d.model.denomination_id"
                placeholder="Select a church denomination"
                :options="d.options.denominations"
              />
            </n-form-item>
            <!-- e.o Denomination -->

            <!-- Phone -->
            <n-form-item path="phone_number" label="Church Phone Number">
              <n-input
                v-model:value="d.model.phone_number"
                placeholder="Enter church phone number"
              />
            </n-form-item>
            <!-- e.o Phone -->

            <!-- Is Visited -->
            <n-form-item path="is_visited" label="Is Visited">
              <n-switch v-model:value="d.model.is_visited"></n-switch>
            </n-form-item>
            <!-- e.o Is Visited -->
          </n-gi>

          <n-gi>
            <n-form-item
              path="church_members_count"
              label="Church Members Count"
            >
              <n-input-number
                v-model:value="d.model.church_members_count"
                clearable
              />
            </n-form-item>

            <n-form-item
              path="confession_of_faith_count"
              label="Confession of Faith Count"
            >
              <n-input-number
                v-model:value="d.model.confession_of_faith_count"
                clearable
              />
            </n-form-item>

            <n-form-item path="baptized_count" label="Baptized Count">
              <n-input-number v-model:value="d.model.baptism_count" clearable />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-card>

      <n-card size="small">
        <n-form-item path="current_prayers" label="Current Prayers">
          <n-input
            v-model:value="d.model.current_prayers"
            type="textarea"
            :rows="4"
          />
        </n-form-item>
      </n-card>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
// Imports
// mandatory . standard imports. need for all forms.
import type { FormInst, FormRules } from "naive-ui"
import modules from "~/utils/modules"

// mandatory . variable form model types.
import { RoutePaths } from "~/types/index.d"
import type { ChurchFormModel } from "~/types/index.d"

// optional . modular imports based on what the module form need
// mostly for computes
import { useConsumeApi } from "~/composables/useConsumeApi"
import { useAuthStore } from "~/stores/useAuthStore"
import { useDenominationStore } from "~/stores/useDenominationsStore"
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<ChurchFormModel>

// Self Ref : Need to set a module
const module = modules.churches

const consume = {
  users: useConsumeApi(RoutePaths.USERS),
  contacts: useConsumeApi(RoutePaths.CONTACTS),
  churches: useConsumeApi(RoutePaths.CHURCHES),
  faithMilestones: useConsumeApi(RoutePaths.FAITH_MILESTONES),
  communicationPlatforms: useConsumeApi(RoutePaths.COMMUNICATION_PLATFORMS),
  denomination: useConsumeApi(RoutePaths.DENOMINATIONS),
  communities: useConsumeApi(RoutePaths.COMMUNITIES),
}

const emit = defineEmits(["formChanged"])

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | ChurchFormModel
    hiddenFieldsOnEdit: string[]
  }>(),
  {
    editData: false,
    hiddenFieldsOnEdit: () => {
      return []
    },
  },
) // e.o p

/**
 * formRef for the form
 */
const formRef = ref<FormInst | null>(null)

/**
 * Form Rules.
 * Its spreaded from the {@link Module}
 */
const rules: FormRules = { ...module.form.rules }

/** Model Ref
 * It is defined to whether create or edit.
 * If edit , it gets from `p.editData`.
 * If create, it gets from `module.form.model`.
 *
 * SELF REF:
 * Need to change form model type. 2 places.
 * ref<"FORM_MODEL"> and as "FORM_MODEL" at the end
 */
let modelRefRef = module.form.model as ChurchFormModel
let existingAssignedTo = {}
let existingParentChurch = {}
let existingCommunity = {}

// if the edit data is not false, which means it is an edit form,
// then format some things to be used in the form.
if (p.editData !== false) {
  modelRefRef = p.editData

  if ("assigned_to" in p.editData) {
    const at = JSON.parse(JSON.stringify(p.editData.assigned_to))
    existingAssignedTo = { ...at }
    if (at !== null) {
      modelRefRef.assigned_to = "id" in (at as any) ? (at as any).id : null
    }
  }

  if ("founded_at" in p.editData) {
    p.editData.founded_at = new Date(p.editData.founded_at).getTime()
  }

  if ("church_planters" in p.editData) {
    p.editData.church_planters = p.editData.church_planters.map(
      (cp: any) => cp.user,
    )
  }

  if ("parent_church" in p.editData) {
    const pc = JSON.parse(JSON.stringify(p.editData.parent_church))
    existingParentChurch = { ...pc }
    if (pc !== null) {
      modelRefRef.parent_church_id = "id" in (pc as any) ? (pc as any).id : null
    }
  }

  if ("community" in p.editData) {
    const community = JSON.parse(JSON.stringify(p.editData.community))
    existingCommunity = { ...community }
    if (community !== null) {
      modelRefRef.community_id =
        "id" in (community as any) ? (community as any).id : null
    }
  }
} else {
}

const modelRef: ModelRefType = ref({ ...modelRefRef })

// data
const d = reactive({
  model: modelRef,
  loading: {
    churches: false,
    assignedTo: false,
    coachedBy: false,
    baptizedBy: false,
    community: false,
  },
  options: {
    assignedTo: [] as string[],
    coachedBy: [] as string[],
    churches: [] as any[],
    addedChurchPlanters: [] as any[],
    denominations: [] as any[],
    communities: [] as any[],
  },
}) // e.o d

// Computes that need for the form
// e.o Computes that need for the form
//

const m = {
  handle: {
    searchAssignedToOption: async (query: string) => {
      d.loading.assignedTo = true

      const searchResult = await consume.users.browse(
        {
          all: true,
          search_by: "name",
          search: query,
          whereNotIn: {
            key: "user_role_id",
            value: [1, 2, 5],
          },
        },
        false,
      )

      d.options.assignedTo = [
        ...searchResult.map((user: any) => ({
          label: user.name,
          value: user.id,
        })),
      ]
      d.loading.assignedTo = false
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

    searchCommunityOption: async (query: string) => {
      d.loading.community = true

      const searchResult = await consume.communities.browse(
        {
          all: true,
          search_by: "name",
          search: query,
        },
        false,
      )

      d.options.communities = [
        ...searchResult.map((community: any) => ({
          label: community.name,
          value: community.id,
        })),
      ]

      d.loading.community = false
    },

    emit: {
      addedChurchPlanter: (user: any) => {
        d.model.church_planters.push(user)
      },

      removedChurchPlanter: (user: any) => {
        d.model.church_planters = d.model.church_planters.filter(
          (cp: any) => cp.id !== user.id,
        )
      },
    },
  },

  consume: {
    defaultUsersForAssignedToOption: async () => {
      const users = await consume.users.list({
        labelOption: "name",
        limit: 20,
      })

      d.options.assignedTo = [...users]

      if (p.editData === false) {
        const authStore = useAuthStore()
        const userAlreadyInList = d.options.assignedTo.find(
          (ou: any) => ou.value === authStore.authUser.id,
        )

        if (userAlreadyInList === undefined) {
          if ("name" in authStore.authUser && "id" in authStore.authUser) {
            d.options.assignedTo.push({
              label: authStore.authUser.name,
              value: authStore.authUser.id,
            } as any)
          }
        }

        // set auth user as selected to "Assigned To"
        d.model.assigned_to = authStore.authUser.id
      } else {
        if ("assigned_to" in p.editData) {
          const label =
            "name" in (existingAssignedTo as any)
              ? (existingAssignedTo as any).name
              : null
          const value =
            "id" in (existingAssignedTo as any)
              ? (existingAssignedTo as any).id
              : null
          d.options.assignedTo.push({ label: label, value: value } as any)
        }
      }
    },

    defaultChurchesForChurchesOption: async () => {
      const churches = await consume.churches.list({
        labelOption: "name",
        limit: 20,
      })

      d.options.churches = [...churches]

      if (p.editData !== false) {
        if ("parent_church" in p.editData) {
          const label =
            "name" in (existingParentChurch as any)
              ? (existingParentChurch as any).name
              : null
          const value =
            "id" in (existingParentChurch as any)
              ? (existingParentChurch as any).id
              : null
          d.options.churches.push({ label: label, value: value } as any)
        }
      }
    },

    defaultCommunitiesForCommunityOption: async () => {
      const communities = await consume.communities.list({
        labelOption: "name",
        limit: 20,
      })

      d.options.communities = [...communities]

      if (p.editData !== false) {
        if ("community" in p.editData) {
          const label =
            "name" in (existingCommunity as any)
              ? (existingCommunity as any).name
              : null
          const value =
            "id" in (existingCommunity as any)
              ? (existingCommunity as any).id
              : null
          d.options.communities.push({ label: label, value: value } as any)
        }
      }
    },

    getDenominationList: async () => {
      d.options.denominations = await consume.denomination.list({
        labelOption: "name",
        limit: 20,
      })
    },
  },
}

watch(
  () => d.model,
  (modelVal) => {
    // d.model.password_confirmation = d.model.password
    const payload = { ...modelVal }

    if (payload.founded_at !== undefined) {
      payload.founded_at = new Date(payload.founded_at)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
    }

    if (payload.church_planters) {
      payload.church_planters = [
        ...payload.church_planters.map((c: any) => c.id),
      ]
    }

    emit("formChanged", payload)
  },
  { deep: true },
)

m.consume.defaultUsersForAssignedToOption()
m.consume.defaultChurchesForChurchesOption()
m.consume.defaultCommunitiesForCommunityOption()
m.consume.getDenominationList()
</script>

<style></style>
