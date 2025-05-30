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

    <!-- Username -->
    <n-form-item
      path="username"
      :label="h.translate('username')"
    >
      <n-input v-model:value="d.model.username" :placeholder="h.translate('please_input')" />
    </n-form-item> <!-- e.o Username -->

    <!-- Password -->
    <n-form-item
      v-if="p.editData === false"
      path="password"
      :label="h.translate('password')"
    >
      <n-input
        v-model:value="d.model.password"
        show-password-on="click"
        type="password"
        :placeholder="h.translate('please_input')"
      />
    </n-form-item> <!-- e.o Password -->

    <!-- User Role -->
    <n-form-item
      path="user_role_id"
      :label="h.translate('user_role')"
    >
      <n-flex justify="center">
        <n-radio-group
          v-model:value="d.model.user_role_id"
          name="userRoleRadioGroup"
        >
          <n-radio-button
            v-for="role in userRoleOptions"
            :key="role.value"
            :value="role.value"
            :label="role.label"
          />
        </n-radio-group>
      </n-flex>
    </n-form-item> <!-- e.o User Role -->

    <!-- Movement -->
     <n-form-item
      path="movement"
      :label="h.translate('movement')"
     >
      <n-select
        v-model:value="d.model.movement_id"
        clearable
        :placeholder="h.translate('select_movement')"
        :options="movementOptions"
      />
     </n-form-item> <!-- e.o Movement -->

    <!-- Biography -->
    <n-form-item
      path="biography"
      :label="h.translate('biography')"
    >
      <n-input
        v-model:value="d.model.biography"
        type="textarea"
        :placeholder="h.translate('please_input')"
      />
    </n-form-item> <!-- e.o Biography -->

    <!-- Preferred Language -->
    <n-form-item
      path="preferred_language_id"
      :label="h.translate('preferred_language')"
    >
      <n-select
        v-model:value="d.model.preferred_language_id"
        clearable
        :placeholder="h.translate('select_preferred_language')"
        :options="languageOptions"
      />
    </n-form-item> <!-- e.o Preferred Language -->

    <!-- Email -->
    <n-form-item
      path="email"
      :label="h.translate('email')"
    >
      <n-input v-model:value="d.model.email" :placeholder="h.translate('please_input')" />
    </n-form-item> <!-- e.o Email -->

    <!-- Phone Number -->
    <n-form-item
      path="phone_number"
      :label="h.translate('phone_number')"
    >
      <n-input v-model:value="d.model.phone_number" :placeholder="h.translate('please_input')" />
    </n-form-item> <!-- e.o Phone Number -->

    <!-- Is Active -->
    <n-form-item
      path="is_active"
      :label="h.translate('is_active')"
      @change="console.log(d.model.is_active)"
    >
      <n-switch v-model:value="d.model.is_active" />
    </n-form-item> <!-- e.o Is Active -->

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
  import type { UserFormModel } from '~/types'

  // optional . modular imports based on what the module form need 
  // mostly for computes
  import { useUserStore } from '~/stores/useUsersStore'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  import { useMovementsStore } from '~/stores/useMovementsStore'
  // e.o Imports



  // mandatory . defining a model ref type. change the ref
  type ModelRefType = Ref<UserFormModel>

  // Self Ref : Need to set a module
  const module = modules.users

  const emit = defineEmits(['formChanged'])

const h = useHelpers()


  // props
  // Self Ref : Need to change editData form model type
  // editData: false | < what form model ? >
  const p = withDefaults(defineProps<{
    editData: false | UserFormModel,
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
  const modelRef: ModelRefType = ref({ ...p.editData !== false ? p.editData : module.form.model as UserFormModel })

  // data
  const d = reactive({
    model: modelRef,
  }) // e.o d

 
  const userRoleOptions = computed(() => {

    return useUserStore().userRoles.map((role: any) => ({
      label: h.translate(h.toSnakeCase(role.label)),
      value: role.id
    })).reverse()

  })

  const languageOptions = computed(() => {

    return useLanguagesStore().languages.map((language: any) => ({
      label: language.name,
      value: language.id,
    }))

  })

  const movementOptions = computed(() => {
    return useMovementsStore().movements.map((movement: any) => ({
      label: movement.name,
      value: movement.id,
    }))
  })
  // e.o Computes that need for the form

  watch(() => d.model, (newVal) => {
    d.model.password_confirmation = d.model.password

    emit('formChanged', d.model)
  }, { deep: true })

</script>

<style></style>