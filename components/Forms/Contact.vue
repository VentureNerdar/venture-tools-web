<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="translatedRules"
    label-placement="top"
    size="small"
    label-width="150px"
  >
    <n-space :size="10" vertical>
      <n-card size="small">
        <n-grid x-gap="10" :cols="4">
          <!-- Contact Status -->
          <!-- <n-gi>
            <n-form-item path="contact_status_id" :label="h.translate('contact_status')">
              <n-select
                v-model:value="d.model.contact_status_id"
                :options="useSettingStore().options.contact"
              />
            </n-form-item>
          </n-gi> -->
          <!-- e.o Contact Status -->
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
          <!-- Faith Status -->
          <n-gi>
            <n-form-item path="faith_status_id" :label="h.translate('faith_status')">
              <n-select
                v-model:value="d.model.faith_status_id"
                :options="useSettingStore().options.faith"
              />
            </n-form-item>
          </n-gi>
          <!-- e.o Faith Status -->

          <!-- Assigned To -->
          <n-gi>
            <n-form-item path="assigned_to" :label="h.translate('assigned_to')">
              <n-select
                :loading="d.loading.assignedTo"
                filterable
                clearable
                remote
                @search="m.handle.searchAssignedToOption"
                v-model:value="d.model.assigned_to"
                :options="d.options.assignedTo as any[]"
                :placeholder="h.translate('please_select')"
              >
                <template #action>
                  <n-text :depth="3">
                    {{ h.translate('loading_maximum_20_users._type_in_the_name_of_the_user_to_search') }}
                  </n-text>
                </template>
              </n-select>
            </n-form-item>
          </n-gi>
          <!-- e.o Assigned To -->

          <!-- Coached By -->
          <n-gi>
            <n-form-item path="coached_by" :label="h.translate('coached_by')">
              <n-select
                :loading="d.loading.coachedBy"
                filterable
                clearable
                remote
                :placeholder="h.translate('please_select')"
                @search="m.handle.searchCoachedByOption"
                v-model:value="d.model.coached_by"
                :options="d.options.coachedBy as any[]"
              >
                <template #action>
                  <n-text :depth="3">
                    {{ h.translate('loading_maximum_20_contacts._type_in_the_name_of_the_contact_to_search') }}
                  </n-text>
                </template>
              </n-select>
            </n-form-item>
          </n-gi>
          <!-- e.o Coached By -->
        </n-grid>
      </n-card>

      <n-card size="small">
        <n-grid x-gap="10" :cols="4">
          <!-- Name -->
          <n-gi>
            <n-form-item path="name" :label="h.translate('name')">
              <n-input v-model:value="d.model.name" :placeholder="h.translate('please_input')" />
            </n-form-item>
          </n-gi>
          <!-- e.o Name -->

          <!-- Nickname -->
          <n-gi>
            <n-form-item path="nickname" :label="h.translate('nickname')">
              <n-input v-model:value="d.model.nickname" :placeholder="h.translate('please_input')" />
            </n-form-item>
          </n-gi>
          <!-- e.o Nickname -->

          <!-- Gender -->
          <n-gi>
            <n-form-item path="gender" :label="h.translate('gender')">
              <n-radio-group v-model:value="d.model.gender" name="radiogroup">
                <n-space>
                  <n-radio
                    v-for="gender in s.settings.options.genders"
                    :key="gender.value"
                    :value="gender.value"
                    :label="gender.label"
                  />
                </n-space>
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <!-- e.o Gender -->

          <!-- Age -->
          <n-gi>
            <n-form-item path="age" :label="h.translate('age')">
              <n-select
                v-model:value="d.model.age"
                :options="useSettingStore().options.ageGroups"
                :placeholder="h.translate('please_select')"
              />
            </n-form-item>
          </n-gi>
          <!-- e.o Age -->

          <n-gi>
            <n-form-item path="people_group" :label="h.translate('people_group')">
              <n-select
                v-model:value="d.model.people_group"
                multiple
                :options="usePeopleGroupStore().options"
                :placeholder="h.translate('please_select')"
              />
            </n-form-item>
          </n-gi>
        </n-grid>

        <n-grid :cols="4">
          <n-gi span="4">
            <n-card size="small">
              <n-space vertical>
                <b>{{ h.translate('contact_platforms') }}</b>

                <n-grid x-gap="10" :cols="5">
                  <n-gi
                    v-for="cp in d.options.communicationPlatforms"
                    :key="cp.id"
                  >
                    <ModalsContactCommunicationPlatforms
                      :platform="cp"
                      :contactCommunicationPlatforms="
                        d.model.contact_communication_platforms
                      "
                      @save-clicked="
                        m.handle.emit.communicationPlatformSaveClicked
                      "
                      @edit-clicked="
                        m.handle.emit.communicationPlatformEditClicked
                      "
                      @delete-clicked="
                        m.handle.emit.communicationPlatformDeleteClicked
                      "
                    />
                  </n-gi>
                </n-grid>
              </n-space>
            </n-card>
          </n-gi>
        </n-grid>
      </n-card>

      <!-- Faith Milestones -->
      <n-card size="small">
        <n-grid x-gap="10" :cols="4">
          <!-- Faith Milestones -->
          <n-gi span="2">
            <!-- Faith Milestones -->
            <n-form-item path="asdf" :label="h.translate('faith_milestones')">
              <n-flex>
                <n-button
                  v-for="fm in d.options.faithMilestones"
                  :type="m.handle.change.faithMilestoneOptionType(fm.id)"
                  size="medium"
                  :secondary="
                    m.handle.change.faithMilestoneOptionSecondary(fm.id)
                  "
                  @click="m.handle.addToFaithMilestoneForm(fm)"
                >
                  <n-image
                    width="20"
                    :preview-disabled="true"
                    :src="useRuntimeConfig().public.rootURL + fm.icon"
                    style="
                      margin-right: 5px;
                      border-radius: 4px;
                      background-color: rgba(0, 0, 0, 0.2);
                      padding: 2px 1px;
                    "
                  />

                  {{ fm.name }}
                </n-button>
              </n-flex>
            </n-form-item>
            <!-- e.o Faith Milestones -->
          </n-gi>
          <!-- e.o Faith Milestones -->

          <!-- Baptized By -->
          <n-gi>
            <n-form-item path="baptized_by" :label="h.translate('baptized_by')">
              <n-select
                v-model:value="d.model.baptized_by"
                :loading="d.loading.baptizedBy"
                :options="d.options.baptizedBy as any[]"
                filterable
                clearable
                remote
                @search="m.handle.searchCoachedByOption"
                :placeholder="h.translate('please_select')"
              >
                <template #action>
                  <n-text :depth="3">
                    {{ h.translate('loading_maximum_20_contacts._type_in_the_name_of_the_contact_to_search') }}
                  </n-text>
                </template>
              </n-select>
            </n-form-item>
          </n-gi>
          <!-- e.o Baptized By -->

          <!-- Baptism Date -->
          <n-gi>
            <n-form-item path="baptism_date" :label="h.translate('baptism_date')">
              <n-date-picker
                v-model:value="d.model.baptism_date"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="dd MMM yyyy"
                :input-readonly="true"
                type="date"
                style="width: 100%"
                :placeholder="h.translate('please_input')"
              />
            </n-form-item>
          </n-gi>
          <!-- e.o Baptism Date -->
        </n-grid>
      </n-card>

      <!-- Current Prayers -->
      <n-card size="small">
        <!-- Current Prayers -->
        <n-form-item path="current_prayers" :label="h.translate('current_prayers')">
          <n-input
            type="textarea"
            :autosize="{ minRows: 3 }"
            v-model:value="d.model.current_prayers"
            :placeholder="h.translate('please_input')"
          />
        </n-form-item>
        <!-- e.o Current Prayers -->
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
import { RoutePaths, type ContactFormModel } from "~/types/index.d"

// optional . modular imports based on what the module form need
// mostly for computes
import { useConsumeApi } from "~/composables/useConsumeApi"
import { useSettingStore } from "~/stores/useSettingsStore"
import { useAuthStore } from "~/stores/useAuthStore"
import { usePeopleGroupStore } from "~/stores/usePeopleGroupsStore"
import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformsStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"

// e.o Imports

// helpers
const helpers = {}

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<ContactFormModel>

// Self Ref : Need to set a module
const module = modules.contacts
const consume = {
  users: useConsumeApi(RoutePaths.USERS),
  contacts: useConsumeApi(RoutePaths.CONTACTS),
  faithMilestones: useConsumeApi(RoutePaths.FAITH_MILESTONES),
  communicationPlatforms: useConsumeApi(RoutePaths.COMMUNICATION_PLATFORMS),
}

const emit = defineEmits(["formChanged", "beingUploaded"])

const h = useHelpers()

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | ContactFormModel
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
  const result: Record<string, any[]> = {};

  for (const key in rules) {
    result[key] = (rules[key] as FormRules[]).map((rule:any) => {
      
      return {
        ...rule,
        message: h.translate(h.toSnakeCase(rule.message)),
      };
    });
  }

  return result;
});


/** Model Ref
 * It is defined to whether create or edit.
 * If edit , it gets from `p.editData`.
 * If create, it gets from `module.form.model`.
 *
 * SELF REF:
 * Need to change form model type. 2 places.
 * ref<"FORM_MODEL"> and as "FORM_MODEL" at the end
 */

let modelRefRef = module.form.model as ContactFormModel
let existingAssignedTo = {}
let existingCoachedBy = {}
let existingBaptizedBy = {}

const s = {
  settings: useSettingStore(),
  communicationPlatforms: useCommunicationPlatformStore(),
}

// if the edit data is not false, which means it is an edit form,
// then format some things to be used in the form.
if (p.editData !== false) {
  modelRefRef = p.editData

  if ("faith_milestones" in p.editData) {
    modelRefRef.faith_milestones = p.editData.faith_milestones?.map(
      (fm: any) => fm.id,
    )
  }

  if ("assigned_to" in p.editData) {
    const at = JSON.parse(JSON.stringify(p.editData.assigned_to))
    existingAssignedTo = { ...at }
    if (at !== null) {
     modelRefRef.assigned_to = "id" in (at as any) ? (at as any).id : null
   }

  }

  if ("coached_by" in p.editData) {
    const cb = JSON.parse(JSON.stringify(p.editData.coached_by))
    existingCoachedBy = { ...cb }
    if (cb !== null) {
      modelRefRef.coached_by = "id" in (cb as any) ? (cb as any).id : null
    }
  }

  if ("baptized_by" in p.editData) {
    const bb = JSON.parse(JSON.stringify(p.editData.baptized_by))
    existingBaptizedBy = { ...bb }

    if (bb !== null) {
      modelRefRef.baptized_by = "id" in (bb as any) ? (bb as any).id : null
    }
  }

  if ("people_group" in p.editData) {
    modelRefRef.people_group = p.editData.people_group?.map((pg: any) => pg.id)
  }

  if ("contact_communication_platforms" in p.editData) {
    const originalContactCommunicationPlatforms = [
      ...(p.editData.contact_communication_platforms as any),
    ]
    modelRefRef.contact_communication_platforms = []
    s.communicationPlatforms.communicationPlatforms.forEach(
      (cp: { name: string; id: number }) => {
        if (modelRefRef.contact_communication_platforms !== undefined) {
          ;(
            modelRefRef.contact_communication_platforms as {
              [key: number]: any[]
            }
          )[cp.id] = []
        }
      },
    )

    originalContactCommunicationPlatforms.forEach((ccp: any) => {
      if (modelRefRef.contact_communication_platforms) {
        modelRefRef.contact_communication_platforms[
          ccp.communication_platform_id
        ].push(ccp.value)
      }
    })
  }
} else {
  // format faith milestones
  modelRefRef.faith_milestones = []

  // format contact communication platforms
  modelRefRef.contact_communication_platforms = {}

  s.communicationPlatforms.communicationPlatforms.forEach(
    (cp: { name: string; id: number }) => {
      if (modelRefRef.contact_communication_platforms) {
        ;(
          modelRefRef.contact_communication_platforms as {
            [key: number]: any[]
          }
        )[cp.id] = []
      }
    },
  )
}

const modelRef: ModelRefType = ref({ ...modelRefRef })

// data
const d = reactive({
  model: modelRef,
  options: {
    assignedTo: [] as string[],
    coachedBy: [] as string[],
    baptizedBy: [] as string[],
    faithMilestones: [] as any[],
    communicationPlatforms: [] as any[],
  },

  loading: {
    assignedTo: false,
    coachedBy: false,
    baptizedBy: false,
  },
}) // e.o d

// methods
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

    searchCoachedByOption: async (query: string) => {
      d.loading.coachedBy = true
      d.loading.baptizedBy = true

      const searchResult = await consume.contacts.browse(
        {
          all: true,
          search_by: "name",
          search: query,
        },
        false,
      )

      d.options.coachedBy = [
        ...searchResult.map((contact: any) => ({
          label: contact.name,
          value: contact.id,
        })),
      ]
      d.options.baptizedBy = [
        ...searchResult.map((contact: any) => ({
          label: contact.name,
          value: contact.id,
        })),
      ]

      d.loading.coachedBy = false
      d.loading.baptizedBy = false
    },

    addToFaithMilestoneForm: (fm: any) => {
      if (!d.model.faith_milestones) {
        d.model.faith_milestones = []
      }

      if (!d.model.faith_milestones.includes(fm.id)) {
        d.model.faith_milestones.push(fm.id)
      } else {
        d.model.faith_milestones = d.model.faith_milestones.filter(
          (id) => id !== fm.id,
        )
      }
    },

    change: {
      faithMilestoneOptionType: (fmID: number) => {
        return d.model.faith_milestones?.includes(fmID) ? "info" : "default"
      },

      faithMilestoneOptionSecondary: (fmID: number) => {
        return d.model.faith_milestones?.includes(fmID) ? false : true
      },
    },

    emit: {
      communicationPlatformSaveClicked: (value: {
        id: number
        value: string
      }) => {
        if (d.model.contact_communication_platforms) {
          d.model.contact_communication_platforms[value.id].push(
            value.value as any,
          )
        }
      },

      communicationPlatformEditClicked: (value: {
        id: number
        value: string
        editValue: string
      }) => {
        if (d.model.contact_communication_platforms) {
          d.model.contact_communication_platforms[value.id] =
            d.model.contact_communication_platforms[value.id].map(
              (v: string) => (v === value.editValue ? value.value : v),
            )
        }
      },

      communicationPlatformDeleteClicked: (value: {
        id: number
        value: string
      }) => {
        if (d.model.contact_communication_platforms) {
          d.model.contact_communication_platforms[value.id] =
            d.model.contact_communication_platforms[value.id].filter(
              (v: string) => v !== value.value,
            )
        }
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

        if ("coached_by" in p.editData) {
          const label =
            "name" in (existingCoachedBy as any)
              ? (existingCoachedBy as any).name
              : null
          const value =
            "id" in (existingCoachedBy as any)
              ? (existingCoachedBy as any).id
              : null
          d.options.coachedBy.push({ label: label, value: value } as any)
        }

        if ("baptized_by" in p.editData) {
          const label =
            "name" in (existingBaptizedBy as any)
              ? (existingBaptizedBy as any).name
              : null

          const value =
            "id" in (existingBaptizedBy as any)
              ? (existingBaptizedBy as any).id
              : null

          d.options.baptizedBy.push({ label: label, value: value } as any)
        }
      }
    },

    defaultContactsForCoachedByOption: async () => {
      const contacts = await consume.contacts.list({
        labelOption: "name",
        limit: 20,
      })

      d.options.coachedBy = [...contacts]
      d.options.baptizedBy = [...contacts]
    },

    faithMilestones: async () => {
      d.options.faithMilestones = await consume.faithMilestones.browse(
        { all: true },
        false,
      )
    },

    communicationPlatforms: async () => {
      d.options.communicationPlatforms =
        await consume.communicationPlatforms.browse({ all: true }, false)

      d.options.communicationPlatforms =
        d.options.communicationPlatforms.reverse()
    },

    searchOption: () => {},
  },

  render: {
    assignedTo: (at: any) => {
      return typeof at === "object" ? at.name : at
    },
  },
} // e.o methods

// Computes that need for the form
// e.o Computes that need for the form

// watch and emit form changes
watch(
  () => d.model,
  (newVal) => {
    const payload = { ...newVal }

    if (payload.baptism_date !== undefined) {
      payload.baptism_date = new Date(payload.baptism_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
    }

    if (payload.contact_communication_platforms) {
      const ccp = [] as any[]
      Object.entries(payload.contact_communication_platforms).forEach(
        ([key, value]) => {
          if (value.length > 0) {
            value.forEach((value: string) => {
              ccp.push({ communication_platform_id: key, value: value })
            })
          }
        },
      )

      payload.contact_communication_platforms = ccp
    }

    emit("formChanged", payload)
  },
  { deep: true },
) // e.o watch and emit form changes


m.consume.defaultUsersForAssignedToOption()
m.consume.defaultContactsForCoachedByOption()
m.consume.faithMilestones()
m.consume.communicationPlatforms()
</script>

<style></style>
