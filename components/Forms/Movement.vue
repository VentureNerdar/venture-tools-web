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
      <n-input v-model:value="d.model.name" :placeholder="h.translate('please_input')" />
    </n-form-item> <!-- e.o Name -->

    <!-- Description -->
    <n-form-item
      path="description"
      :label="h.translate('description')"
    >
      <n-input
        v-model:value="d.model.description"
        type="textarea"
        :placeholder="h.translate('please_input')"
      />
    </n-form-item> <!-- e.o Name -->

  </n-form>
</template>

<script
  lang="ts"
  setup
>

  // Imports
  // mandatory . standard imports. need for all forms.
  import type {
    FormInst,
    FormRules,
  } from 'naive-ui'
  import modules from '~/utils/modules'

  // mandatory . variable form model types.
  import type { MovementFormModel } from '~/types'

  // optional . modular imports based on what the module form need 
  // mostly for computes
  import { useUserStore } from '~/stores/useUsersStore'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  // e.o Imports



  // mandatory . defining a model ref type. change the ref
  type ModelRefType = Ref<MovementFormModel>

  // Self Ref : Need to set a module
  const module = modules.movements

  const emit = defineEmits(['formChanged'])

    const h = useHelpers()

  // props
  // Self Ref : Need to change editData form model type
  // editData: false | < what form model ? >
  const p = withDefaults(defineProps<{
    editData: false | MovementFormModel,
    hiddenFieldsOnEdit: string[]
  }>(), {
    editData: false,
    hiddenFieldsOnEdit: () => {
      return []
    }
  }) // e.o p

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
  const modelRef: ModelRefType = ref({ ...p.editData !== false ? p.editData : module.form.model as MovementFormModel })

  // data
  const d = reactive({
    model: modelRef,
  }) // e.o d

  // Computes that need for the form

  // e.o Computes that need for the form

  watch(() => d.model, (newVal) => {
    // d.model.password_confirmation = d.model.password

    emit('formChanged', d.model)
  }, { deep: true })

</script>

<style></style>