<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="translatedRules"
    label-placement="top"
    size="small"
    label-width="150px"
  >
    <!-- Name -->
    <n-form-item
      path="prompt_text"
      :label="h.translate('prompt_text')"
    >
      <n-input
        v-model:value="d.model.prompt_text"
        :placeholder="h.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Name -->
  </n-form>
</template>
<script lang="ts" setup>
// Imports
// mandatory . standard imports. need for all forms.
import type { FormInst, FormRules } from "naive-ui"
import modules from "~/utils/modules"

// mandatory . variable form model types.
import type { PrayerPromptFormModel } from "~/types"

// optional . modular imports based on what the module form need
// mostly for computes
import { useUserStore } from "~/stores/useUsersStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"
import { useAuthStore } from "~/stores/useAuthStore"
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<PrayerPromptFormModel>

// Self Ref : Need to set a module
const module = modules.prayerPrompts

const emit = defineEmits(["formChanged"])

const h = useHelpers()
const authStore = useAuthStore()

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | PrayerPromptFormModel
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
// add user_id to the form
const modelRef: ModelRefType = ref({
  ...(p.editData !== false
    ? p.editData
    : ({
        ...module.form.model,
        user_id: authStore.authUser?.id,
      } as PrayerPromptFormModel)),
})
console.log("Model Ref", modelRef)
console.log("user_id", authStore.authUser?.id)
// data
const d = reactive({
  model: modelRef,
}) // e.o d

// Computes that need for the form

const userRoleOptions = computed(() => {
  return useUserStore()
    .userRoles.map((role: any) => ({
      label: role.label,
      value: role.id,
    }))
    .reverse()
})

const languageOptions = computed(() => {
  return useLanguagesStore().languages.map((language: any) => ({
    label: language.name,
    value: language.id,
  }))
})

// e.o Computes that need for the form

watch(
  () => d.model,
  (newVal) => {
    // d.model.password_confirmation = d.model.password

    emit("formChanged", d.model)
  },
  { deep: true },
)
</script>

<style></style>
