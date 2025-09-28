<template>
  <div :class="isMobile ? 'mobile-container' : 'desktop-container'">
    <div>
      <NotificationTable
        :data="notifications"
        @row-click="handleRowClick"
        @delete-row="handleDeleteRow"
      />
    </div>
    <div class="form-container">
      <NotificationForm
        v-model:form="form"
        @update:form="handleFormUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoutePaths, type BrowseConditionAll, type MovementNotificationFormModel } from "~/types/index.d"
import { useAuthStore } from "~/stores/useAuthStore"

const form = ref({
  title: '',
  body: '',
})

const notifications = ref<MovementNotificationFormModel[]>([])

const authStore = useAuthStore()
const { isMobile } = useScreenSize()

const handleRowClick = (row: any) => {
  form.value.title = row.title
  form.value.body = row.body
}

// API Integration
const movementNotificationModel = RoutePaths.MOVEMENT_NOTIFICATIONS
const consumeMovementNotification = useConsumeApi(movementNotificationModel)
const browseCondition = {
  all: true,
  limit: 20,
  where: JSON.stringify([{ key: "user_id", value: authStore.authUser.id }]),
} as BrowseConditionAll

const fetchNotification = async () => {
  try {
    const response = await consumeMovementNotification.browse(browseCondition, false) as MovementNotificationFormModel[]
    notifications.value = response
    console.log(notifications.value)
  } catch (error) {
    console.error("Error fetching notification:", error)
  }
}

const handleFormUpdate = async (formData: any) => {
  const formWithUser = {
    ...formData,
    user_id: authStore.authUser.id,
  }
  try {
    console.log('Form updated Final:', formWithUser)
    const response = await consumeMovementNotification.save(formWithUser)
    if (response) {
      notifications.value.unshift(response)
      form.value = {
        title: '',
        body: '',
      }
    }
  } catch (error) {
    console.error("Error saving notification:", error)
  }
}

const handleDeleteRow = async (row: any) => {
  console.log('Deleting row:', row)
  const consume = useConsumeApi(RoutePaths.MOVEMENT_NOTIFICATIONS, row.id)
  const response = await consume.delete(true)
  if (response) {
    notifications.value = notifications.value.filter(notification => notification.id !== row.id)
  }
}

fetchNotification()
</script>

<style lang="scss" scoped>
.desktop-container {
  display: flex;
  gap: 10px;

  .form-container {
    width: 100%;
  }
}

.mobile-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}
</style>
