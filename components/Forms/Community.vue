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
      <n-grid
        x-gap="10"
        :cols="4"
      >
        <!-- Is Active -->
        <n-gi>
          <n-form-item
            path="is_active"
            :label="h.translate('is_active')"
          >
            <n-switch v-model:value="d.model.is_active"></n-switch>
          </n-form-item>
        </n-gi>
        <!-- e.o Is Active -->
        <!-- Name -->
        <n-gi span="2">
          <n-form-item
            path="name"
            :label="h.translate('name')"
          >
            <n-input
              v-model:value="d.model.name"
              :placeholder="h.translate('please_input')"
            />
          </n-form-item>
        </n-gi>
        <!-- e.o Name -->

        <n-gi span="2">
          <n-form-item
            :label="
              h.translate('location') === ''
                ? 'Location'
                : h.translate('location')
            "
          >
            <n-input-group>
              <n-input
                v-model:value="d.model.location_longitude"
                :placeholder="h.translate('longitude')"
                size="small"
              />
              <n-input
                v-model:value="d.model.location_latitude"
                :placeholder="h.translate('latitude')"
                size="small"
              />

              <FormPartialsSelectLocation
                :latitude="Number(d.model.location_latitude)"
                :longitude="Number(d.model.location_longitude)"
                @update="m.handle.emits.communityLocationUpdated"
              />
            </n-input-group>
          </n-form-item>
        </n-gi>
      </n-grid>

      <n-grid
        x-gap="10"
        :cols="4"
      >
        <!-- Community Checklists -->
        <n-gi span="2">
          <FormPartialsCommunityChecklists
            :checklists="d.model.checklists as CommunityChecklistFormModel[]"
            @changed="m.handle.emits.communityChecklistChanged"
          />
        </n-gi>
        <!-- e.o Community Checklists -->

        <n-gi>
          <FormPartialsCommunityPeacePersons
            :peacePersons="d.model.peace_persons as any[]"
            @added="m.handle.emits.communityPeacePersonAdded"
            @updated="m.handle.emits.communityPeacePersonUpdated"
            @deleted="m.handle.emits.communityPeacePersonDeleted"
          />
        </n-gi>

        <n-gi>
          <FormPartialsCommunityCommittees
            :committees="d.model.committees"
            @added="m.handle.emits.communityCommitteeAdded"
            @updated="m.handle.emits.communityCommitteeUpdated"
            @deleted="m.handle.emits.communityCommitteeDeleted"
          />
        </n-gi>
      </n-grid>

      <n-grid
        x-gap="10"
        :cols="4"
      >
        <n-gi span="2">
          <n-card size="small">
            <n-space
              :size="10"
              vertical
            >
              <n-checkbox
                v-model:checked="d.model.conducted_survey_of_community_needs"
              >
                {{ h.translate("conducted_survey_of_community_needs") }}
              </n-checkbox>

              <n-input
                v-model:value="d.model.community_needs_1"
                :disabled="
                  d.model.conducted_survey_of_community_needs ? false : true
                "
                :placeholder="h.translate('community_needs') + ' 1'"
              />
              <n-input
                v-model:value="d.model.community_needs_2"
                :disabled="
                  d.model.conducted_survey_of_community_needs ? false : true
                "
                :placeholder="h.translate('community_needs') + ' 2'"
              />
              <n-input
                v-model:value="d.model.community_needs_3"
                :disabled="
                  d.model.conducted_survey_of_community_needs ? false : true
                "
                :placeholder="h.translate('community_needs') + ' 3'"
              />
              <n-input
                v-model:value="d.model.community_needs_4"
                :disabled="
                  d.model.conducted_survey_of_community_needs ? false : true
                "
                :placeholder="h.translate('community_needs') + ' 4'"
              />
              <n-input
                v-model:value="d.model.community_needs_5"
                :disabled="
                  d.model.conducted_survey_of_community_needs ? false : true
                "
                :placeholder="h.translate('community_needs') + ' 5'"
              />
            </n-space>
          </n-card>
        </n-gi>


        <!-- Add church from community  -->
        <n-gi v-if="p.editData">
          <n-list
            bordered
            hoverable
          >
            <template #header>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <b>
                  {{ h.translate("churches") }} :
                  {{ d.model.churches ? d.model.churches.length : "" }}
                </b>
                <n-button
                  @click="m.handle.click.handleChurchAdd"
                  type="primary"
                >
                  <n-icon>
                    <PlusRound />
                  </n-icon>
                </n-button>
              </div>
              <ModalsGenericSaveForm
                :show-modal="d.visibility.churchForm"
                :form-modal-options="churchFormModalOptions"
                :form="false"
                :store-options="churchStoreOption"
                :route-path="RoutePaths.CHURCHES"
                @close-modal="d.visibility.churchForm = false"
                @saved-form="m.handle.emits.handleSavedChurchForm"
              />
            </template>

            <n-scrollbar style="max-height: 250px">
              <n-list-item v-for="church in d.model.churches">
                {{ church.name }}
              </n-list-item>
            </n-scrollbar>
          </n-list>
        </n-gi>

        <n-gi v-if="p.editData">
          <FormPartialsCommunityChurchPlanters
            :churchPlanters="d.model.churchPlanters as any[]"
            :communityID="Number(d.model.id)"
          />
        </n-gi>
      </n-grid>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
// Imports
// mandatory . standard imports. need for all forms.
import type { FormInst, FormRules } from "naive-ui"
import modules, { type Module } from "~/utils/modules"
import { RoutePaths } from "~/types/index.d"
import FormsChurch from "./Church.vue"
import { PlusRound, MapRound } from "@vicons/material"
// mandatory . variable form model types.
import type {
  ChurchFormModel,
  CommunityChecklistFormModel,
  CommunityFormModel,
  StoreOptions,
} from "~/types"
import { useAuthStore } from "~/stores/useAuthStore"
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<CommunityFormModel>

// Self Ref : Need to set a module
const module = modules.communities

const emit = defineEmits(["formChanged"])
// Language Switching
const h = useHelpers()
const authUser = useAuthStore().authUser
// e.o Language Switching

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | CommunityFormModel
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
        message: h.translate(h.toSnakeCase(rule.message)),
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
let modelRefRef = module.form.model as CommunityFormModel
if (p.editData !== false) {
  modelRefRef = p.editData

  if (p.editData.checklists) {
    modelRefRef = {
      ...modelRefRef,
      checklists: p.editData.checklists.map((c: any) => c.id),
    }
  }
} else {
}

const modelRef: ModelRefType = ref({ ...modelRefRef })

// data
const d = reactive({
  model: modelRef,
  visibility: {
    churchForm: false,
  },
}) // e.o d

onMounted(() => {
  d.model.created_by = authUser.id
})
// Computes that need for the form
// e.o Computes that need for the form

const m = {
  handle: {
    click: {
      handleChurchAdd: () => {
        d.visibility.churchForm = true
      },
    },
    emits: {
      communityChecklistChanged: (param: { id: number; checked: boolean }) => {
        const checklists = d.model.checklists
          ? (d.model.checklists as number[])
          : ([] as number[])

        const index = checklists.indexOf(param.id)

        if (param.checked) {
          if (index === -1) {
            checklists.push(param.id)
          }
        } else {
          if (index !== -1) {
            checklists.splice(index, 1)
          }
        }

        d.model.checklists = checklists
      },

      communityPeacePersonAdded: (param: any) => {
        if (!d.model.peace_persons) {
          d.model.peace_persons = []
        }

        d.model.peace_persons.push(param)
      },

      communityPeacePersonUpdated: (param: any) => {
        const index = d.model.peace_persons.findIndex(
          (p) => p.name === param.originalName,
        )

        if (index !== -1) {
          d.model.peace_persons[index] = {
            ...d.model.peace_persons[index],
            ...param,
          }
        }
      },

      communityPeacePersonDeleted: (param: any) => {
        const index = d.model.peace_persons.findIndex(
          (p) => p.name === param.name,
        )

        if (index !== -1) {
          d.model.peace_persons.splice(index, 1)
        }
      },

      communityCommitteeAdded: (param: any) => {
        if (!d.model.committees) {
          d.model.committees = []
        }

        d.model.committees.push(param)
      },

      communityCommitteeUpdated: (param: any) => {
        const index = d.model.committees.findIndex(
          (p) => p.name === param.originalName,
        )

        if (index !== -1) {
          d.model.committees[index] = {
            ...d.model.committees[index],
            ...param,
          }
        }
      },

      communityCommitteeDeleted: (param: any) => {
        const index = d.model.committees.findIndex((p) => p.name === param.name)

        if (index !== -1) {
          d.model.committees.splice(index, 1)
        }
      },

      handleSavedChurchForm: (form: ChurchFormModel) => {
        if (form) {
          d.model.churches?.push(form)
        }
      },

      communityLocationUpdated: (position: any, place: any) => {
        d.model.location_latitude = position.lat
        d.model.location_longitude = position.lng
        d.model.google_location_data = JSON.stringify(place)
        if (place.adminLevels) {
          d.model.province_name = place.adminLevels.administrative_area_level_1
          d.model.district_name = place.adminLevels.administrative_area_level_2
        }
      },
    },
  },
}

// Add Church Form
const churchModule = modules.churches as Module
const churchStoreOption = {
  storeState: module.store.church,
  ...module.options.store,
} as StoreOptions
const churchFormModalOptions = {
  moduleName: churchModule.name,
  components: {
    formComponent: FormsChurch,
    buttonIconComponent: churchModule.form.createButtonIconComponent,
  },
  routePath: churchModule.routePath,
  width: churchModule.form.modalWidthSize,
  hiddenFieldsOnEdit: churchModule.dataTable.hiddenFieldsOnEdit,
  form: churchModule.form.model,
  communityId: d.model.id,
}

watch(
  () => d.model,
  (modelVal) => {
    const payload = { ...modelVal }

    emit("formChanged", payload)
  },
  { deep: true },
)
</script>

<style></style>
