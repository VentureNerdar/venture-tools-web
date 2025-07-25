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
      path="name"
      :label="h.translate('name')"
    >
      <n-input
        v-model:value="d.model.name"
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
import {
  type CommunityChecklistFormModel,
  type DenominationFormModel,
} from "~/types"
import { RoutePaths } from "~/types/index.d"
import { useCommunityStore } from "~/stores/useCommunitiesStore"
import { storeToRefs } from "pinia"

// optional . modular imports based on what the module form need
// mostly for computes
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<CommunityChecklistFormModel>

// Self Ref : Need to set a module
const module = modules.communityChecklist

const emit = defineEmits(["formChanged"])

// Language Switching
const h = useHelpers()
// e.o Language Switching

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | CommunityChecklistFormModel
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
const model = RoutePaths.COMMUNITY_CHECKLISTS
const consume = useConsumeApi(model)
const communityChecklist = await consume.browse({ all: true })
const modelRef: ModelRefType = ref({
  // add default order number if editData is false
  ...(p.editData !== false
    ? p.editData
    : ({
        ...module.form.model,
        order: communityChecklist.length,
      } as CommunityChecklistFormModel)),
})
// data
const d = reactive({
  model: modelRef,
}) // e.o d

// Computes that need for the form
// e.o Computes that need for the form

watch(
  () => d.model,
  () => {
    // d.model.password_confirmation = d.model.password
    emit("formChanged", d.model)
  },
  { deep: true },
)
</script>

<style></style>
