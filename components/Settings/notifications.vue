<template>
  <GenericsActionBar>
    <template #left>
      <b>Manage Notification</b>
    </template>
    <template #right></template>
  </GenericsActionBar>

  <n-card size="small">
    <n-space 
      vertical
      :size="10"
    
    >
      <div class="label">How often should the notifications be sent?</div>
      <div class="noti-container">
        <div>Once every</div>
        <n-input-number 
          v-model:value="notiForm.intervalValue" 
          placeholder="Please input number" 
          class="input"
        />
        <n-select 
          placeholder="Please select unit"
          v-model:value="notiForm.intervalUnit"
          :options="intervalUnitOptions"
          class="select"
        />
        <n-button
          type="success"
          secondary
          size="medium"
          @click="handleClick"
          class="button"
        >
          {{ existingNotificationId ? 'Update' : 'Create' }}
        </n-button>
      </div>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { RoutePaths, type NotificationFormModel } from '~/types/index.d'


const notiForm = ref({
  intervalValue: null,
  intervalUnit: null 
})
const intervalUnitOptions = [
  {value: 'minutes', label: 'Minutes'},
  {value: 'hours', label: 'Hours'},
  {value: 'days', label: 'Days'},
  {value: 'weeks', label: 'Weeks'},
  {value: 'months', label: 'Months'},
]

const notificationModel = RoutePaths.NOTIFICATIONS
const consumeNotification = useConsumeApi(notificationModel)
let existingNotificationId= ref<number | null | undefined>(null)
let existingNotification  = ref< NotificationFormModel | null>(null)



const fetchNotification = async () => {
  const response = await consumeNotification.browse({
    all: true,
  }) as NotificationFormModel


   existingNotification.value =
    Array.isArray(response) && response.length > 0
      ? response[0]
      : null

  if (existingNotification.value) {
    existingNotificationId.value = existingNotification.value.id

   if(existingNotification.value.value != null) {
     try {
        const parsedValue = JSON.parse(existingNotification.value.value)
        notiForm.value.intervalValue = parsedValue.intervalValue
        notiForm.value.intervalUnit = parsedValue.intervalUnit
      } catch (e) {
        console.error("Error in creating or updating notification", e)
      }
   }
  }
}
fetchNotification()

const handleClick = async() => {
console.log(JSON.stringify(notiForm.value))
  const payload = {

    name: 'notification interval',
    value: JSON.stringify(notiForm.value), 
  }

   if (existingNotificationId.value) {
    const updateApi = useConsumeApi(notificationModel, existingNotificationId.value)
    await updateApi.save(payload)
  } else {
    const response = await consumeNotification.save(payload)
    existingNotificationId.value = response.id
  }
 
}
</script>

<style scoped lang="scss">
.noti-container {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
  .input, .select, .button {
    max-width: 240px;
  }
}
.label {
  font-weight: 500;
}
</style>
