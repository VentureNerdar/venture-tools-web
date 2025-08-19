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
      :label="helpers.translate('name')"
    >
      <n-input
        v-model:value="d.model.name"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Name -->

    <!-- Username -->
    <n-form-item
      path="username"
      :label="helpers.translate('username')"
    >
      <n-input
        v-model:value="d.model.username"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Username -->

    <!-- Password -->
    <n-form-item
      v-if="p.editData === false"
      path="password"
      :label="helpers.translate('password')"
    >
      <n-input
        v-model:value="d.model.password"
        show-password-on="click"
        type="password"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Password -->

    <!-- User Role -->
    <n-form-item
      path="user_role_id"
      :label="helpers.translate('user_role')"
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
    </n-form-item>
    <!-- e.o User Role -->

    <!-- Movement -->
    <n-form-item
      path="movement"
      :label="helpers.translate('movement')"
    >
      <n-select
        v-model:value="d.model.movement_id"
        clearable
        :placeholder="helpers.translate('select_movement')"
        :options="d.options.movements"
      />
    </n-form-item>
    <!-- e.o Movement -->

    <!-- Contact -->
    <n-form-item
      path="contact_id"
      :label="helpers.translate('contact')"
    >
      <n-select
        :loading="d.loading.contacts"
        filterable
        clearable
        remote
        @search="m.handle.searchContactsOption"
        v-model:value="d.model.contact_id"
        :options="d.options.contacts"
        :render-label="m.handle.userRenderLabel"
        :placeholder="helpers.translate('please_select')"
        size="large"
      >
        <template #action>
          <n-text :depth="3">
            {{
              helpers.translate(
                "loading_maximum_20_users._type_in_the_name_of_the_user_to_search",
              )
            }}
          </n-text>
        </template>
      </n-select>
    </n-form-item>
    <!-- e.o Contact -->

    <!-- Biography -->
    <n-form-item
      path="biography"
      :label="helpers.translate('biography')"
    >
      <n-input
        v-model:value="d.model.biography"
        type="textarea"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Biography -->

    <!-- Preferred Language -->
    <n-form-item
      path="preferred_language_id"
      :label="helpers.translate('preferred_language')"
    >
      <n-select
        v-model:value="d.model.preferred_language_id"
        clearable
        :placeholder="helpers.translate('select_preferred_language')"
        :options="languageOptions"
      />
    </n-form-item>
    <!-- e.o Preferred Language -->

    <!-- Email -->
    <n-form-item
      path="email"
      :label="helpers.translate('email')"
    >
      <n-input
        v-model:value="d.model.email"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Email -->

    <!-- Phone Number -->
    <n-form-item
      path="phone_number"
      :label="helpers.translate('phone_number')"
    >
      <n-input
        v-model:value="d.model.phone_number"
        :placeholder="helpers.translate('please_input')"
      />
    </n-form-item>
    <!-- e.o Phone Number -->

    <!-- Is Active -->
    <n-form-item
      path="is_active"
      :label="helpers.translate('is_active')"
      @change="console.log(d.model.is_active)"
    >
      <n-switch v-model:value="d.model.is_active" />
    </n-form-item>
    <!-- e.o Is Active -->
  </n-form>
</template>

<script lang="ts" setup>
// Imports
// mandatory . standard imports. need for all forms.
import type { FormInst, FormRules } from "naive-ui"
import modules from "~/utils/modules"
import { NText } from "naive-ui"

// mandatory . variable form model types.
import type { UserFormModel } from "~/types"

// optional . modular imports based on what the module form need
// mostly for computes
import { useUserStore } from "~/stores/useUsersStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useContactStore } from "~/stores/useContactsStore"
import { useMovementsStore } from "~/stores/useMovementsStore"
import { useConsumeApi } from "~/composables/useConsumeApi"
import { RoutePaths, type ContactFormModel } from "~/types/index.d"
// e.o Imports

// mandatory . defining a model ref type. change the ref
type ModelRefType = Ref<UserFormModel>

// Self Ref : Need to set a module
const module = modules.users

const emit = defineEmits(["formChanged"])

const helpers = useHelpers()

// props
// Self Ref : Need to change editData form model type
// editData: false | < what form model ? >
const p = withDefaults(
  defineProps<{
    editData: false | UserFormModel
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
const modelRef: ModelRefType = ref({
  ...(p.editData !== false ? p.editData : (module.form.model as UserFormModel)),
})

const consume = {
  contacts: useConsumeApi(RoutePaths.CONTACTS),
  movements: useConsumeApi(RoutePaths.MOVEMENTS),
}

// data
const d = reactive({
  model: modelRef,
  loading: {
    contacts: false,
  },
  options: {
    contacts: [] as any[],
    movements: [] as any,
  },
}) // e.o d

onMounted(async () => {
  const contacts = await consume.contacts.browse(
    {
      all: true,
      search_by: "name",
      search: "",
      with: JSON.stringify(["assignedTo", "assignedTo.movement"]),
    },
    false,
  )

  d.options.contacts = contacts.map((contact: any) => ({
    label: contact.name,
    verifier: contact.assigned_to?.name,
    movement: contact.assigned_to?.movement?.name,
    value: contact.id,
  }))

  d.options.movements = await consume.movements.list({
    labelOption: "name",
    limit: 20,
    existingID: d.model.movement_id,
  })
})

const m = {
  handle: {
    searchContactsOption: async (query: string) => {
      d.loading.contacts = true
      const res = await consume.contacts.browse(
        {
          all: true,
          search_by: "name",
          search: query,
          with: JSON.stringify(["assignedTo", "assignedTo.movement"]),
        },
        false,
      )

      d.options.contacts = [
        ...res.map((contact: any) => ({
          label: contact.name,
          verifier: contact.assigned_to?.name,
          movement: contact.assigned_to?.movement?.name,
          value: contact.id,
        })),
      ] as any
      d.loading.contacts = false
    },
    userRenderLabel: (option: any) => {
      const verifier = option.verifier || ""
      const movement = option.movement || ""
      const description = verifier
        ? movement
          ? `${verifier} (${movement})`
          : verifier
        : movement

      return h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
          },
        },
        [
          h("span", { style: { fontWeight: "500" } }, option.label as string),
          h(
            NText,
            { depth: 3, tag: "span", style: { marginBottom: "8px" } },
            { default: () => description },
          ),
        ],
      )
    },
  },
}

const userRoleOptions = computed(() => {
  return useUserStore()
    .userRoles.map((role: any) => ({
      label: helpers.translate(helpers.toSnakeCase(role.label)),
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
    d.model.password_confirmation = d.model.password

    emit("formChanged", d.model)
  },
  { deep: true },
)
</script>

<style></style>
