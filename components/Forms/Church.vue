<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="translatedRules"
    label-placement="top"
    size="small"
    label-width="150px"
  >
    <n-space
      :size="10"
      vertical
    >
      <n-card size="small">
        <n-grid
          x-gap="10"
          :cols="10"
        >
          <n-gi>
            <n-form-item
              path="is_active"
              :label="helpers.translate('is_active')"
            >
              <n-switch v-model:value="d.model.is_active"></n-switch>
            </n-form-item>
          </n-gi>

          <n-gi span="2">
            <n-form-item
              path="assigned_to"
              :label="helpers.translate('assigned_to')"
            >
              <n-select
                :loading="d.loading.assignedTo"
                filterable
                clearable
                remote
                @search="m.handle.searchAssignedToOption"
                v-model:value="d.model.assigned_to"
                :options="assignedToOptions"
              >
                <template #action>
                  <n-text :depth="3">
                    <!-- {{ h.translate('loading_maximum_20_users._type_in_the_name_of_the_user_to_search') }} -->
                  </n-text>
                </template>
              </n-select>
            </n-form-item>
          </n-gi>

          <n-gi span="2">
            <!-- Community -->
            <n-form-item
              path="community_id"
              :label="helpers.translate('community')"
            >
              <n-select
                v-model:value="d.model.community_id"
                :placeholder="helpers.translate('select_a_community')"
                filterable
                clearable
                remote
                @search="m.handle.searchCommunityOption"
                :loading="d.loading.community"
                :options="computedCommunityOptions"
              />
            </n-form-item>
            <!-- <n-modal 
            v-model:show="showCreateCommunityModal" 
            title="Create Community"
            transform-origin="center"
            :mask-closable="false"
            >
              <FormsCommunity @created="handleCommunityCreated" />
            </n-modal> -->
            <ModalsGenericSaveForm
              :show-modal="showCreateCommunityModal"
              :form="false"
              :form-modal-options="formModalOptions"
              :store-options="communityStoreOption"
              :route-path="RoutePaths.COMMUNITIES"
              @close-modal="showCreateCommunityModal = false"
              @saved-form="handleSavedCommunityForm"
            />
            <!-- @community-id="(id) => d.model.community_id = id" -->
          </n-gi>
          <!-- e.o Community -->

          <!-- Parent Church -->
          <n-gi span="2">
            <ModalsChurchPlanters
              :churchPlanters="d.model.church_planters"
              @added-church-planter="m.handle.emit.addedChurchPlanter"
              @removed-church-planter="m.handle.emit.removedChurchPlanter"
            />
          </n-gi>

          <n-gi span="3">
            <n-form-item
              :label="
                helpers.translate('location') === ''
                  ? 'Location'
                  : helpers.translate('location')
              "
            >
              <n-input-group>
                <n-input
                  v-model:value="d.model.location_longitude"
                  :placeholder="helpers.translate('longitude')"
                  size="small"
                />
                <n-input
                  v-model:value="d.model.location_latitude"
                  :placeholder="helpers.translate('latitude')"
                  size="small"
                />

                <FormPartialsSelectLocation
                  :latitude="Number(d.model.location_latitude)"
                  :longitude="Number(d.model.location_longitude)"
                  :places="d.model.google_location_data"
                  @update="m.handle.emit.churchLocationUpdated"
                />
              </n-input-group>
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-card>

      <n-card size="small">
        <n-grid
          :cols="5"
          x-gap="10"
        >
          <n-gi span="2">
            <!-- Name -->
            <n-form-item
              path="name"
              :label="helpers.translate('church_name')"
            >
              <n-input
                v-model:value="d.model.name"
                :placeholder="helpers.translate('enter_church_name')"
              />
            </n-form-item>
            <!-- e.o Name -->

            <!-- Description -->
            <n-form-item
              path="description"
              :label="helpers.translate('description')"
            >
              <n-input
                v-model:value="d.model.description"
                type="textarea"
                :rows="4"
                :placeholder="helpers.translate('please_input')"
              />
            </n-form-item>
            <!-- e.o Description -->
          </n-gi>

          <n-gi>
            <!-- Parent Church -->
            <n-form-item
              path="parent_church_id"
              :label="helpers.translate('parent_church')"
            >
              <n-select
                v-model:value="d.model.parent_church_id"
                :placeholder="
                  helpers.translate('select_a_parent_church_if_any')
                "
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
            <!-- <n-form-item
              path="website"
              :label="helpers.translate('church_website')"
            >
              <n-input
                v-model:value="d.model.website"
                :placeholder="helpers.translate('enter_church_website')"
              />
            </n-form-item> -->
            <!-- e.o Website -->

            <!-- Founded At -->
            <n-form-item
              path="founded_at"
              :label="helpers.translate('founded_at')"
            >
              <n-date-picker
                v-model:value="d.model.founded_at"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="dd MMM yyyy"
                :placeholder="helpers.translate('select_a_date')"
                style="width: 100%"
                :input-readonly="true"
              />
            </n-form-item>
          </n-gi>

          <n-gi>
            <!-- Denomination -->
            <n-form-item
              path="denomination"
              :label="helpers.translate('denomination')"
            >
              <n-select
                v-model:value="d.model.denomination_id"
                :placeholder="helpers.translate('select_a_church_denomination')"
                :options="d.options.denominations"
              />
            </n-form-item>
            <!-- e.o Denomination -->

            <!-- Phone -->
            <!-- <n-form-item
              path="phone_number"
              :label="helpers.translate('church_phone_number')"
            >
              <n-input
                v-model:value="d.model.phone_number"
                :placeholder="helpers.translate('enter_church_phone_number')"
              />
            </n-form-item> -->
            <!-- e.o Phone -->

            <!-- Is Visited -->
            <n-form-item
              path="is_visited"
              :label="helpers.translate('is_visited')"
            >
              <n-switch v-model:value="d.model.is_visited"></n-switch>
            </n-form-item>
            <!-- e.o Is Visited -->
          </n-gi>

          <n-gi>
            <n-form-item
              path="church_members_count"
              :label="helpers.translate('church_members_count')"
            >
              <n-input-number
                v-model:value="d.model.church_members_count"
                clearable
                :placeholder="helpers.translate('please_input')"
              />
            </n-form-item>

            <n-form-item
              path="confession_of_faith_count"
              :label="helpers.translate('confession_of_faith_count')"
            >
              <n-input-number
                v-model:value="d.model.confession_of_faith_count"
                clearable
                :placeholder="helpers.translate('please_input')"
              />
            </n-form-item>

            <n-form-item
              path="baptized_count"
              :label="helpers.translate('baptized_count')"
            >
              <n-input-number
                v-model:value="d.model.baptism_count"
                clearable
                :placeholder="helpers.translate('please_input')"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-card>

      <n-card size="small">
        <n-form-item
          path="prayer_prompt"
          :label="helpers.translate('prayer_prompt')"
        >
          <n-select
            :loading="d.loading.prayerPrompt"
            filterable
            clearable
            remote
            :options="d.options.prayerPrompt"
            :placeholder="helpers.translate('please_select')"
            @update:value="m.handle.setPrayerPrompt"
          />
        </n-form-item>
        <n-form-item
          path="current_prayers"
          :label="helpers.translate('current_prayers')"
        >
          <n-input
            v-model:value="d.model.current_prayers"
            type="textarea"
            :placeholder="helpers.translate('please_input')"
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
import type { FormInst, FormRules, SelectOption } from "naive-ui"
import modules from "~/utils/modules"
import ModalsGenericSaveForm from "../Modals/GenericSaveForm.vue"

// mandatory . variable form model types.
import { RoutePaths } from "~/types/index.d"
import type {
  ChurchFormModel,
  CommunityFormModel,
  FormModalOptions,
  StoreOptions,
} from "~/types/index.d"

// optional . modular imports based on what the module form need
// mostly for computes
import { useConsumeApi } from "~/composables/useConsumeApi"
import { useAuthStore } from "~/stores/useAuthStore"
import { useDenominationStore } from "~/stores/useDenominationsStore"
import { useSettingStore } from "~/stores/useSettingsStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import FormCommunity from "./Community.vue"
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<ChurchFormModel>

// Self Ref : Need to set a module
const module = modules.churches

// const h = useHelpers()

const consume = {
  users: useConsumeApi(RoutePaths.USERS),
  contacts: useConsumeApi(RoutePaths.CONTACTS),
  churches: useConsumeApi(RoutePaths.CHURCHES),
  faithMilestones: useConsumeApi(RoutePaths.FAITH_MILESTONES),
  communicationPlatforms: useConsumeApi(RoutePaths.COMMUNICATION_PLATFORMS),
  denomination: useConsumeApi(RoutePaths.DENOMINATIONS),
  communities: useConsumeApi(RoutePaths.COMMUNITIES),
  prayerPrompts: useConsumeApi(RoutePaths.PRAYER_PROMPTS),
}

const emit = defineEmits(["formChanged"])

// Language Switching
const helpers = useHelpers()
// e.o Language Switching

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

const translatedRules = computed(() => {
  const result: Record<string, any[]> = {}

  for (const key in rules) {
    result[key] = (rules[key] as FormRules[]).map((rule: any) => {
      return {
        ...rule,
        message: helpers.translate(helpers.toSnakeCase(rule.message)),
      }
    })
  }

  return result
})

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
      modelRefRef.assigned_to =
        typeof at === "object" && at !== null && "id" in at ? at.id : at
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
    prayerPrompt: false,
  },
  options: {
    assignedTo: [] as string[],
    coachedBy: [] as string[],
    churches: [] as any[],
    addedChurchPlanters: [] as any[],
    denominations: [] as any[],
    communities: [] as any[],
    prayerPrompt: [] as any[],
  },
}) // e.o d

// Computes that need for the form
const assignedToOptions = computed(() => {
  return d.options.assignedTo as any[]
})

// e.o Computes that need for the form
//

// Add Community Form
const communityModule = modules.communities as Module
const showCreateCommunityModal = ref(false)
const communityStoreOption = {
  storeState: communityModule.store.communities,
  ...communityModule.options.store,
} as StoreOptions

const formModalOptions = {
  moduleName: communityModule.name,
  components: {
    formComponent: FormCommunity,
    buttonIconComponent: communityModule.form.createButtonIconComponent,
  },
  routePath: communityModule.routePath,
  width: communityModule.form.modalWidthSize,
  hiddenFieldsOnEdit: communityModule.dataTable.hiddenFieldsOnEdit,
  form: communityModule.form.model,
} as FormModalOptions

const handleSavedCommunityForm = (form: CommunityFormModel) => {
  d.options.communities.push({
    value: form.id,
    label: form.name,
  })
  d.model.community_id = form.id as number
}

const computedCommunityOptions = computed(() => {
  return [
    {
      label: () =>
        h(
          "div",
          {
            style:
              "display: flex; justify-content: space-between; align-items: center; color: #18a058; font-weight: 500; cursor: pointer;",
            onClick: () => {
              // Close dropdown if needed manually
              d.model.community_id = null
              showCreateCommunityModal.value = true
            },
          },
          ["Create New Community"],
        ),
      value: "__create__",
      disabled: true, // so selecting this won't assign to v-model
    },
    ...d.options.communities,
  ]
})

const computedGoogleLocationData = computed(() => {
  return d.model.google_location_data
    ? d.model.google_location_data
    : ([] as any[])
})
// e.o Add Community Form

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

    setPrayerPrompt: (value: any) => {
      const option = d.options.prayerPrompt.find(
        (opt: any) => opt.value === value,
      )
      d.model.current_prayers = option ? option.label : value
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
      churchLocationUpdated: (position: any, place: any) => {
        d.model.location_latitude = position.lat.toString()
        d.model.location_longitude = position.lng.toString()
        d.model.google_location_data = JSON.stringify(place)
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

      const prayerPrompt = await consume.prayerPrompts.list({
        labelOption: "prompt_text",
        limit: 20,
      })

      d.options.prayerPrompt = [...prayerPrompt]

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
