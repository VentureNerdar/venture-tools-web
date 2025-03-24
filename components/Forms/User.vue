<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="rules"
    label-placement="top"
    size="small"
    label-width="150px"
  >

    <!-- Name -->
    <n-form-item
      path="name"
      label="Name"
    >
      <n-input v-model:value="d.model.name" />
    </n-form-item> <!-- e.o Name -->

    <!-- Username -->
    <n-form-item
      path="username"
      label="Username"
    >
      <n-input v-model:value="d.model.username" />
    </n-form-item> <!-- e.o Username -->

    <!-- Password -->
    <n-form-item
      v-if="p.editData === false"
      path="password"
      label="Password"
    >
      <n-input
        v-model:value="d.model.password"
        show-password-on="click"
        type="password"
      />
    </n-form-item> <!-- e.o Password -->

    <!-- User Role -->
    <n-form-item
      path="user_role_id"
      label="User Role"
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

    <!-- Biography -->
    <n-form-item
      path="biography"
      label="Biography"
    >
      <n-input
        v-model:value="d.model.biography"
        type="textarea"
      />
    </n-form-item> <!-- e.o Biography -->

    <!-- Preferred Language -->
    <n-form-item
      path="preferred_language_id"
      label="Preferred Language"
    >
      <n-select
        v-model:value="d.model.preferred_language_id"
        clearable
        placeholder="Select a language"
        :options="languageOptions"
      />
    </n-form-item> <!-- e.o Preferred Language -->

    <!-- Email -->
    <n-form-item
      path="email"
      label="Email"
    >
      <n-input v-model:value="d.model.email" />
    </n-form-item> <!-- e.o Email -->

    <!-- Phone Number -->
    <n-form-item
      path="phone_number"
      label="Phone Number"
    >
      <n-input v-model:value="d.model.phone_number" />
    </n-form-item> <!-- e.o Phone Number -->

    <!-- Is Active -->
    <n-form-item
      path="is_active"
      label="Is Active"
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
  // e.o Imports



  // mandatory . defining a model ref type. change the ref
  type ModelRefType = Ref<UserFormModel>

  // Self Ref : Need to set a module
  const module = modules.users

  const emit = defineEmits(['formChanged'])


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

  // Computes that need for the form

  const userRoleOptions = computed(() => {

    return useUserStore().userRoles.map((role: any) => ({
      label: role.label,
      value: role.id
    })).reverse()

  })

  const languageOptions = computed(() => {

    return useLanguagesStore().languages.map((language: any) => ({
      label: language.name,
      value: language.id,
    }))

  })

  // e.o Computes that need for the form

  watch(() => d.model, (newVal) => {
    d.model.password_confirmation = d.model.password

    emit('formChanged', d.model)
  }, { deep: true })

</script>

<style></style>