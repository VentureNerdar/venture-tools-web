<template>
  <div style="padding: 10px 0; width: calc(100% - 10px);">
    <n-space
      vertical
      :size="10"
    >
      <n-form
        label-placement="left"
        label-width="100"
        size="small"
      >
        <n-form-item label="Username">
          <n-input
            v-model:value="d.form.apiUsername"
            placeholder="Username"
            @change="m.handleUsernameChange"
          />
        </n-form-item>

        <n-form-item label="API Secret">
          <n-input
            v-model:value="d.form.apiSecret"
            placeholder="API Secret"
            @change="m.handleSecretChange"
          />
        </n-form-item>

      </n-form>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'

const notification = useNotification()
const config = useRuntimeConfig()
const token = localStorage.getItem("Bearer")

const d = reactive({
  states: {
    disabled: {
      input: {
        username: false,
        apiSecret: false,
      }
    }
  },

  form: {
    apiUsername: '',
    apiSecret: '',
  }
})

const m = {
  handleUsernameChange() {
    const xx = m.callAPI('POST', 'settings/ishare/save', {
      setting_name: 'iShareAPIUserName',
      setting_value: d.form.apiUsername,
    })

    console.log(xx)
  },

  handleSecretChange() {
    const xx = m.callAPI('POST', 'settings/ishare/save', {
      setting_name: 'iShareAPISecret',
      setting_value: d.form.apiSecret,
    })

    console.log(xx)
  },

  getSettings: async () => {
    const settings: any = await m.callAPI("GET", "settings/ishare/get")

    if (settings.length > 0) {

      settings.forEach((setting: any) => {
        if (setting.name === 'iShareAPIUserName') {
          d.form.apiUsername = JSON.parse(setting.value)
        }

        if (setting.name === 'iShareAPISecret') {
          d.form.apiSecret = JSON.parse(setting.value)
        }
      })
    }
  },

  callAPI: async (method: "GET" | "POST" | "PUT" | "DELETE", url: string, body?: any) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as any

    if (token) {
      headers['Authorization'] = token
    }

    const payload = {
      method: method as any,
      credentials: "include",
      headers: headers,
    } as any

    if (method === "POST") {
      payload.body = body
    }

    const response = await $fetch(config.public.apiURL + url, payload)
      .catch((error: any) => {
        console.error(error)

        notification.error({
          title: "Error",
          description: error.response.status + " " + error.response._data.message,
          duration: 1000,
          keepAliveOnHover: true,
        })
      })

    if (method === 'POST') {
      notification.success({
        title: "Success",
        description: "Settings saved successfully.",
        duration: 1000,
        keepAliveOnHover: true,
      })
    }

    return response
  }
}

m.getSettings()

</script>

<style></style>