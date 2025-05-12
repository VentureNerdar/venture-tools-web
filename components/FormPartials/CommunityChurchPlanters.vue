<template>
  <n-list bordered hoverable>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <b>
          {{ h.translate('church_planters') }} :
          {{ churchPlanters.length }}
        </b>
        <n-button type="primary" @click="m.handle.click.btn.addChurchPlanter">
          <n-icon>
            <PlusRound />
          </n-icon>
        </n-button>
      </div>
      <FormPartialsCommunityChurchPlanterForm
        :churchPlanters="p.churchPlanters"
        :communityID="p.communityID"
        :show-modal="showChurchPlantersModal"
        @added-church-planter="m.handle.emit.addedChurchPlanter"
        @removed-church-planter="m.handle.emit.removedChurchPlanter"
        @close-modal="showChurchPlantersModal = false"
      />

    </template>

    <n-scrollbar style="max-height: 250px">
      <n-list-item v-for="cp in churchPlanters">
        <n-space :size="10" vertical>
          <b>{{ cp.name }}</b>

          <div v-for="c in cp.churches">
            {{ c.name }}
          </div>
        </n-space>
      </n-list-item>
    </n-scrollbar>
  </n-list>
</template>

<script lang="ts" setup>
import { PlusRound } from '@vicons/material'



const h = useHelpers();
const p = defineProps<{
  churchPlanters: any[]
  communityID: number
}>()
const churchPlanters = ref<any[]>([])
churchPlanters.value = p.churchPlanters
const showChurchPlantersModal = ref(false)
// const churchPlanters = ref([])
// churchPlanters.value = p.churchPlanters

const m = {
  handle:{
    click: {
      btn: {
        addChurchPlanter: () => {
          showChurchPlantersModal.value = true
          
        }
      },
      
  },
  emit: {
        addedChurchPlanter: () => {
      },
      removedChurchPlanter: (user: any) => {
        churchPlanters.value = churchPlanters.value.filter((cp: any) => cp.id !== user.id)
      }
    }
}
}
</script>
