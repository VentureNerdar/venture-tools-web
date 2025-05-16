<template>
  <n-grid
    y-gap="10"
    cols="5"
  >
    <n-gi
      :offset="1"
      :span="3"
    >
      <n-card size="small">
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          size="small"
        >
          <n-form-item
            :label="h.translate('name')"
            path="name"
          >
            <n-input
              v-model:value="formValue.name"
              :placeholder="h.translate('input_name')"
            />
          </n-form-item>

          <n-form-item
            :label="h.translate('role')"
            path="user_role_id"
          >
            <n-tag type="info">{{ authUserRoleName }}</n-tag>
          </n-form-item>

          <n-form-item
            :label="h.translate('username')"
            path="username"
          >
            <n-input
              v-model:value="formValue.username"
              :placeholder="h.translate('input_username')"
            />
          </n-form-item>

          <n-form-item
            :label="h.translate('email_address')"
            path="email"
          >
            <n-input
              v-model:value="formValue.email"
              :placeholder="h.translate('input_email_address')"
            />
          </n-form-item>

          <n-form-item
            :label="h.translate('phone_number')"
            path="phone_number"
          >
            <n-input
              v-model:value="formValue.phone_number"
              :placeholder="h.translate('input_phone_number')"
            />
          </n-form-item>

          <n-form-item
            :label="h.translate('biography')"
            path="biography"
          >
            <n-input
              v-model:value="formValue.biography"
              type="textarea"
              :placeholder="h.translate('input_biography')"
            />
          </n-form-item>

          <n-form-item
            :label="h.translate('preferred_language')"
            path="preferred_language_id"
          >
            <n-select
              v-model:value="formValue.preferred_language_id"
              clearable
              :placeholder="h.translate('select_preferred_language')"
              :options="languageOptions"
            />
          </n-form-item>

          <n-flex justify="center">
            <n-button
              type="warning"
              secondary
              size="small"
              @click="handleProfileUpdate"
            >
              <template #icon><n-icon :component="CloudUploadRound" /></template>
              {{ h.translate('update') }}
            </n-button>
          </n-flex>
        </n-form>

        <n-divider />

        <n-form-item
          :label="h.translate('change_password')"
          label-placement="left"
          size="small"
        >
          <FormPartialsProfileChangePassword />
        </n-form-item>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script
  lang="ts"
  setup
>
  import { useAuthStore } from "~/stores/useAuthStore"
  import { useUserStore } from "~/stores/useUsersStore"
  import { useLanguagesStore } from "~/stores/useLanguagesStore"

  import { CloudUploadRound } from "@vicons/material"
  import { RoutePaths} from "~/types/index.d"
  import { useConsumeApi } from "~/composables/useConsumeApi"
  import type { FormInst } from "naive-ui"
import { useSettingStore } from "~/stores/useSettingsStore"

  const auth = useAuthStore()
  const formRef = ref<FormInst | null>(null)
  const formValue = ref({ ...(auth.authUser as any) })

  const h = useHelpers()


  const s = {
    roles: useUserStore(),
    languages: useLanguagesStore().languages,
    settingStore: useSettingStore(),
  }

  const rules = {
    user: {
      name: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
      },
      age: {
        required: true,
        message: "Please input your age",
        trigger: ["input", "blur"],
      },
    },
    phone: {
      required: true,
      message: "Please input your number",
      trigger: ["input"],
    },
  }

  const languageOptions = computed(() => {
    return useLanguagesStore().languages.map((language: any) => ({
      label: language.name,
      value: language.id,
    }))
  })
  const authUserRoleName = computed(() => {
    return s.roles.userRoles.find((role: any) => role.id === formValue.value.user_role_id)
      ?.label
  })

  const handleProfileUpdate = async () => {
    console.log('handleProfileUpdate', formValue.value)
    const userConsume = useConsumeApi(RoutePaths.USERS, auth.authUser.id)
      const res = await userConsume.save(formValue.value)
      console.log('Profile res', res)
      const existing = JSON.parse(localStorage.getItem("authUser") || "{}")
      const updatedUser = {
        ...existing,
        ...formValue.value,
      }
      useAuthStore().authUser = updatedUser
      localStorage.setItem("authUser", JSON.stringify(updatedUser))
      const selected = s.languages.find((l: any) => l.id === formValue.value.preferred_language_id)
      if(selected) {
        s.settingStore.setUserPreferredLanguage(selected)
      }
  }



</script>
