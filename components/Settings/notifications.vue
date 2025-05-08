<template>
  <GenericsActionBar>
    <template #left>
      <b>Manage Notification</b>
    </template>
    <template #right></template>
  </GenericsActionBar>

  <n-scrollbar style="height: calc(100vh - 160px)">
    <n-card size="small">
      <n-space
        vertical
        :size="10"
      >
        <n-card
          size="small"
          title="Status"
        >
          Enable Notification &nbsp;
          <n-switch v-model:value="notiForm.enabled" />
        </n-card>
        <n-card
          size="small"
          title="Interval"
        >
          <div class="label">How often should the notifications be sent?</div>
          <div class="noti-container">
            <div>Once every</div>
            <n-input-number
              v-model:value="notiForm.intervalValue"
              placeholder="Please enter a number"
              :min="1"
              :disabled="!notiForm.enabled"
              class="input"
            />
            <n-select
              placeholder="Please select unit"
              v-model:value="notiForm.intervalUnit"
              :options="intervalUnitOptions"
              :disabled="!notiForm.enabled"
              class="select"
            />
          </div>

          <!-- Time Selection -->
          <div
            v-if="notiForm.enabled && notiForm.intervalUnit"
            class="time-container"
          >
            <div class="label">At what time?</div>
            <div class="time-selection">
              <!-- Day of Week for Weeks -->
              <template v-if="notiForm.intervalUnit === 'weeks'">
                <n-select
                  v-model:value="notiForm.time.dayOfWeek"
                  :options="dayOfWeekOptions"
                  placeholder="Select day"
                  class="select"
                />
              </template>

              <!-- Day of Month for Months -->
              <template v-if="notiForm.intervalUnit === 'months'">
                <n-select
                  v-model:value="notiForm.time.dayOfMonth"
                  :options="dayOfMonthOptions"
                  placeholder="Select day"
                  class="select"
                />
              </template>

              <!-- Time selection for all units -->
              <n-select
                v-model:value="notiForm.time.hour"
                :options="hourOptions"
                placeholder="Hour"
                class="select"
              />
              <n-select
                v-model:value="notiForm.time.minute"
                :options="minuteOptions"
                placeholder="Minute"
                class="select"
              />
              <n-select
                v-model:value="notiForm.time.ampm"
                :options="ampmOptions"
                placeholder="AM/PM"
                class="select"
              />
            </div>
          </div>
        </n-card>

        <n-card
          size="small"
          title="Message"
        >
          <n-space
            vertical
            :size="20"
          >
            <n-card
              size="small"
              v-for="lang in languagesStore.languages.sort(
                (a: Language, b: Language) => a.id - b.id,
              )"
              :title="lang.name"
            >
              <n-space
                :size="20"
                vertical
              >
                <n-input
                  v-model:value="notiForm.notificationMessage[lang.name].title"
                  :placeholder="`Enter the message title in ${lang.name}`"
                  :disabled="!notiForm.enabled"
                  maxlength="100"
                  show-count
                />

                <n-input
                  v-model:value="notiForm.notificationMessage[lang.name].body"
                  :placeholder="`Enter the message body in ${lang.name}`"
                  :disabled="!notiForm.enabled"
                  type="textarea"
                  maxlength="200"
                  show-count
                />
              </n-space>
            </n-card>
          </n-space>
        </n-card>

        <n-flex justify="end">
          <n-button
            type="success"
            secondary
            size="medium"
            @click="handleClick"
            class="button"
            :disabled="btnCreateUpdateDisableState"
          >
            {{ existingNotificationId ? "Update" : "Create" }}
          </n-button>
        </n-flex>
      </n-space>
    </n-card>
  </n-scrollbar>
</template>

<script
  lang="ts"
  setup
>
  import { RoutePaths, type NotificationFormModel } from "~/types/index.d"
  import { useLanguagesStore } from "~/stores/useLanguagesStore"
  import type { SelectOption } from 'naive-ui'

  // Types
  interface TimeConfig {
    hour: number
    minute: number
    ampm: 'AM' | 'PM'
    dayOfWeek: number
    dayOfMonth: number
  }

  interface NotificationForm {
    enabled: boolean
    intervalValue: number
    intervalUnit: 'days' | 'weeks' | 'months' | null
    notificationMessage: Record<string, { id: number; title: string; body: string }>
    time: TimeConfig
  }

  interface Language {
    id: number
    name: string
  }

  // Store
  const languagesStore = useLanguagesStore()

  // Constants
  const intervalUnitOptions: SelectOption[] = [
    { value: "days", label: "Days" },
    { value: "weeks", label: "Weeks" },
    { value: "months", label: "Months" },
  ]

  const dayOfWeekOptions: SelectOption[] = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ]

  const dayOfMonthOptions: SelectOption[] = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}${getDaySuffix(i + 1)}`,
  }))

  const hourOptions: SelectOption[] = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }))

  const minuteOptions: SelectOption[] = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }))

  const ampmOptions: SelectOption[] = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' },
  ]

  // Helper functions
  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  // Initialize form with default values
  const initializeMessageLanguages = () => {
    return languagesStore.languages.reduce((acc: Record<string, { id: number; title: string; body: string }>, lang: Language) => {
      acc[lang.name] = {
        id: lang.id,
        title: "Venture Tools Reminder",
        body: "Example: Don't forget to check Venture Tools and update your church!",
      }
      return acc
    }, {})
  }

  const notiForm = ref<NotificationForm>({
    enabled: false,
    intervalValue: 1,
    intervalUnit: null,
    notificationMessage: initializeMessageLanguages(),
    time: {
      hour: 9,
      minute: 0,
      ampm: 'AM',
      dayOfWeek: 1,
      dayOfMonth: 1,
    }
  })

  // API Integration
  const notificationModel = RoutePaths.NOTIFICATIONS
  const consumeNotification = useConsumeApi(notificationModel)
  const existingNotificationId = ref<number | null>(null)
  const existingNotification = ref<NotificationFormModel | null>(null)

  // Fetch existing notification
  const fetchNotification = async () => {
    try {
      const response = await consumeNotification.browse({ all: true }) as NotificationFormModel
      existingNotification.value = Array.isArray(response) && response.length > 0 ? response[0] : null

      if (existingNotification.value?.value) {
        existingNotificationId.value = existingNotification.value.id ?? null
        const parsedValue = JSON.parse(existingNotification.value.value)
        Object.assign(notiForm.value, parsedValue)
      }
    } catch (error) {
      console.error("Error fetching notification:", error)
    }
  }

  // Save notification
  const handleClick = async () => {
    try {
      const payload = {
        name: "notification interval",
        value: JSON.stringify(notiForm.value),
      }

      if (existingNotificationId.value) {
        const updateApi = useConsumeApi(notificationModel, existingNotificationId.value)
        await updateApi.save(payload)
      } else {
        const response = await consumeNotification.save(payload)
        existingNotificationId.value = response.id ?? null
      }
    } catch (error) {
      console.error("Error saving notification:", error)
    }
  }

  // Computed properties
  const btnCreateUpdateDisableState = computed(() => {
    const { enabled, intervalValue, intervalUnit, notificationMessage, time } = notiForm.value

    const hasEmptyMessage = Object.values(notificationMessage)
      .some(({ title, body }) => !title?.trim() || !body?.trim())

    const hasInvalidTime =
      time.hour === undefined ||
      time.minute === undefined ||
      !time.ampm ||
      (intervalUnit === 'weeks' && (time.dayOfWeek === undefined || time.dayOfWeek < 1 || time.dayOfWeek > 7)) ||
      (intervalUnit === 'months' && (time.dayOfMonth === undefined || time.dayOfMonth < 1 || time.dayOfMonth > 31))

    return !enabled || !intervalValue || !intervalUnit || hasEmptyMessage || hasInvalidTime
  })

  // Watchers
  watch(
    () => languagesStore.languages,
    (languages) => {
      if (languages?.length) {
        notiForm.value.notificationMessage = initializeMessageLanguages()
      }
    },
    { immediate: true }
  )

  // Initialize
  fetchNotification()
</script>

<style
  scoped
  lang="scss"
>
  .noti-container {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;

    .input,
    .select,
    .button {
      max-width: 240px;
    }
  }

  .time-container {
    margin-top: 20px;
  }

  .time-selection {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;

    .select {
      max-width: 120px;
    }
  }

  .label {
    font-weight: 500;
  }
</style>