<template>
  <n-config-provider
    :theme="darkTheme"
    :theme-overrides="darkThemeOverrides"
  >
    <n-notification-provider :max="5">
      <div class="container">
        <n-flex
          vertical
          justify="center"
        >
          <div class="login-box">
            <n-space
              vertical
              size="large"
            >
              <h3 style="text-align: center">
                <n-text type="primary">VENTURE TOOLS</n-text>
              </h3>
              <n-form
                :model="form"
                ref="formRef"
                :rules="rules"
                label-placement="left"
                label-width="0"
              >
                <n-form-item path="identifier">
                  <n-input
                    v-model:value="form.identifier"
                    placeholder="Email or Username"
                    @keydown.enter="handleLogin"
                  />
                </n-form-item>
                <n-form-item path="password">
                  <n-input
                    v-model:value="form.password"
                    type="password"
                    show-password-on="click"
                    placeholder="Password"
                    @keydown.enter="handleLogin"
                  />
                </n-form-item>

                <n-space
                  vertical
                  size="large"
                >
                  <n-button
                    type="primary"
                    secondary
                    @click="handleLogin"
                    >LOGIN</n-button
                  >
                </n-space>
              </n-form>
            </n-space>
          </div>
        </n-flex>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useMessage, useNotification, useLoadingBar } from "naive-ui"
import { useAuthStore } from "~/stores/useAuthStore"
import { useRouter } from "vue-router"

import { darkTheme } from "naive-ui"
import { NaiveThemeOverrides } from "~/types/NaiveThemeOverrides"
const darkThemeOverrides = { ...NaiveThemeOverrides.darkTheme }

definePageMeta({
  middleware: "guest",
  // layout: ,
  layout: false,
  // layout: 'non-app'
})

// constants
const formRef = ref(null)
const message = useMessage()
const loadingBar = useLoadingBar()
const auth = useAuthStore()
const router = useRouter()
const form = ref({
  identifier: "seb@demo.com",
  password: "demodemo",
  platform: "web",
})

const rules = {
  identifier: [
    {
      required: true,
      message: "Please input your email, username or phone number",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please input your password", trigger: "blur" },
  ],
}

// methods
function handleLogin(e) {
  e.preventDefault()

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loadingBar.start()
      const response = await auth.login(form.value)

      if (response) {
        loadingBar.finish()
        message.create(`Welcome back ${response.user.name}!`, {
          type: "success",
        })

        setTimeout(() => {
          router.push("/splash")
        }, 500)
      }
    } else {
      message.error("Please input your credentials.")
    }
  })
}
</script>

<style lang="scss" scoped>
body {
  padding: 0px;
  margin: 0px;
  background: blue;
}

.login-box {
  width: 300px;
  padding: 20px 40px 40px 40px;

  .n-button {
    width: 100%;
  }
}

.container {
  background: #021526;
  /* const darkBg = "#021526" */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
