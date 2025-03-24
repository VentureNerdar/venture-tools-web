<template>
  <n-button type="error" secondary @click="m.handle.click.button.modal">
    <template #icon>
      <n-icon :component="WarningRound" />
    </template>
    Change Password
  </n-button>

  <n-modal v-model:show="d.visibility.modal" transform-origin="center">
    <n-card
      style="width: 600px"
      title="Change Password"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <n-spin :show="d.loading.form">
        <n-space :size="10" vertical>
          <n-alert
            title="You will need to log in again after you change your password."
            type="info"
          />

          <n-input
            size="small"
            v-model:value="d.form.current_password"
            type="password"
            placeholder="Current Password"
          />

          <n-input
            size="small"
            v-model:value="d.form.new_password"
            type="password"
            placeholder="New Password"
          />

          <n-input
            size="small"
            v-model:value="d.form.confirm_new_password"
            type="password"
            placeholder="Confirm New Password"
          />
        </n-space>
      </n-spin>

      <template #footer>
        <n-flex justify="end">
          <n-button
            type="default"
            size="small"
            :disabled="d.loading.buttonCancel"
            @click="m.handle.click.button.cancel"
            >Cancel</n-button
          >
          <n-button
            type="primary"
            size="small"
            :disabled="d.loading.buttonSave"
            :loading="d.loading.buttonSave"
            @click="m.handle.click.button.save"
            >Save</n-button
          >
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { WarningRound } from "@vicons/material"

import { RoutePaths } from "~/types/index.d"
import { useConsumeApi } from "~/composables/useConsumeApi"
import { useAuthStore } from "~/stores/useAuthStore"

const auth = useAuthStore()

const consume = {
  updateProfile: useConsumeApi(RoutePaths.USERS),
  changePassword: useConsumeApi(RoutePaths.PROFILE_CHANGE_PASSWORD, 0),
}

const d = reactive({
  visibility: {
    modal: false,
    confirm: false,
  },

  loading: {
    form: false,
    buttonSave: false,
    buttonCancel: false,
  },

  form: {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  },
})

const m = {
  handle: {
    click: {
      button: {
        modal: () => {
          d.visibility.modal = true
        },

        cancel: () => {
          d.visibility.modal = false
          m.clearForm()
        },

        save: async () => {
          d.loading.form = true
          d.loading.buttonSave = true
          d.loading.buttonCancel = true

          await m.consume.changePassword()

          d.loading.form = false
          d.loading.buttonSave = true
          d.loading.buttonCancel = true

          d.visibility.modal = false

          m.clearForm()
        },
      },
    },
  },

  consume: {
    changePassword: async () => {
      const result = await consume.changePassword.save(d.form)
      if (result !== false) {
        auth.logout()
      }
    },
  },

  clearForm: () => {
    d.form.current_password = ""
    d.form.new_password = ""
    d.form.confirm_new_password = ""
  },
}
</script>
