<template>
  <div
    v-if="selectedPlatforms.length == 0"
    style="min-height: 300px; display: flex; justify-content: center; align-items: center;"
  >
    No communication platform found
  </div>
  <div v-else>
    <n-descriptions
      label-placement="left"
      bordered
      :column="1"
    >

      <n-descriptions-item
        v-for="(item, i) in selectedPlatforms"
        :key="i"
        :label="item.platformName"
      >
        <a
          :href="getActionLink(item)"
          target="_blank"
          style="color: #4ea1ff; text-decoration: underline; cursor: pointer;"
        >
          {{ item.value }}
        </a>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>


<script lang="ts" setup>
import { useCommunicationPlatformStore } from '~/stores/useCommunicationPlatformsStore'
import type { CommunicationPlatformFormModel, ContactFormModel } from '~/types'

const p = withDefaults(
  defineProps<{
    id: number,
    data: ContactFormModel
  }>(),
  {}
)

interface SelectedPlatform {
  platformName: string
  value: string
}

interface ContactCommunicationPlatform {
  id: number
  communication_platform_id: number
  value: string
}


const s = {
  communicationPlatforms: useCommunicationPlatformStore()
}

onMounted(() => {
  console.log("prop from user selected communication platforms", p.data.contact_communication_platforms)
  console.log("Total communication platform", s.communicationPlatforms.communicationPlatforms)
})

const getActionLink = (item: SelectedPlatform) => {
  const v = item.value
  switch (item.platformName.toLocaleLowerCase()) {
    case 'phone':
      return `tel:${v}`
    case 'email':
      return `mailto:${v}`
    case 'whatsapp':
      return `https://wa.me/${v.replace(/[^0-9]/g, '')}`
    default:
      return '#'
  }
}

const selectedPlatforms = computed<SelectedPlatform[]>(() => {
  const platforms = p.data.contact_communication_platforms
  const list = Array.isArray(platforms) ? platforms as ContactCommunicationPlatform[] : []

  return list.map((item) => {
    const matched = s.communicationPlatforms.communicationPlatforms
      .find((cp: CommunicationPlatformFormModel) => cp.id === item.communication_platform_id)

    return {
      platformName: matched?.name ?? 'Unknown',
      value: item.value
    }
  })
})




</script>