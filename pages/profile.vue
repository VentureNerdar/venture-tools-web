<template>
  <n-grid y-gap="10" cols="5">
    <!-- <n-gi :offset="isChurchPlanter ? 0 : 1" :span="isChurchPlanter ? 2 : 3"> -->
    <n-gi :offset="1" :span="3">
      <n-card size="small">
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          size="small"
        >
          <n-form-item label="Name" path="name">
            <n-input v-model:value="formValue.name" placeholder="Input Name" />
          </n-form-item>

          <n-form-item label="Role" path="user_role_id">
            <n-tag type="info">{{ authUserRoleName }}</n-tag>
          </n-form-item>

          <n-form-item label="Username" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="Input Username"
            />
          </n-form-item>

          <n-form-item label="Email Address" path="email">
            <n-input
              v-model:value="formValue.email"
              placeholder="Input Email Address"
            />
          </n-form-item>

          <n-form-item label="Phone Number" path="phone_number">
            <n-input
              v-model:value="formValue.phone_number"
              placeholder="Input Phone Number"
            />
          </n-form-item>

          <n-form-item label="Biography" path="biography">
            <n-input
              v-model:value="formValue.biography"
              type="textarea"
              placeholder="Input Biography"
            />
          </n-form-item>

          <n-form-item label="Preferred Language" path="preferred_language_id">
            <n-select
              v-model:value="formValue.preferred_language_id"
              clearable
              placeholder="Select Preferred Language"
              :options="languageOptions"
            />
          </n-form-item>

          <n-flex justify="center">
            <n-button type="warning" secondary size="small">
              <template #icon
                ><n-icon :component="CloudUploadRound"
              /></template>
              Update
            </n-button>
          </n-flex>
        </n-form>

        <n-divider />

        <n-form-item
          label="Change Password : "
          label-placement="left"
          size="small"
        >
          <FormPartialsProfileChangePassword />
        </n-form-item>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore"
import { useUserStore } from "~/stores/useUsersStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"

import { CloudUploadRound } from "@vicons/material"

import type { FormInst } from "naive-ui"

const auth = useAuthStore()
const formRef = ref<FormInst | null>(null)
const formValue = ref({ ...(auth.authUser as any) })

const s = {
  roles: useUserStore().userRoles,
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
  console.log(s.roles)

  return s.roles.find((role: any) => role.id === formValue.value.user_role_id)
    ?.label
})

const isChurchPlanter = computed(() => {
  return auth.authUser.user_role_id === 4 ? true : false
})

console.log(auth.authUser)
</script>
