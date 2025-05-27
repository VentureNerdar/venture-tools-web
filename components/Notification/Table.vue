<template>
  <n-card size="small" class="container">
    <div class="notification-table">
      <n-data-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        :row-props="rowProps"
        max-height="calc(100vh - 304px)"
        />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { type MovementNotificationFormModel } from '~/types/index.d'
import { NButton, NIcon } from 'naive-ui'
import { DeleteForeverRound } from '@vicons/material'
const emit = defineEmits(['row-click', 'delete-row'])
const props = defineProps({
  data: {
    type: Array as PropType<MovementNotificationFormModel[]>,
    required: true,
    default: () => [],
  },
})

const data = ref<MovementNotificationFormModel[]>([])
const columns = [
  {
    title: 'Title',
     width: 200,
    key: 'title',
  },
  {
    title: 'Body',
    width: 300,
    key: 'body'
  },
  {
  title: 'Actions',
  key: 'actions',
  width: 100,
  render(row: MovementNotificationFormModel) {
    return h(
      NButton,
      {
        size: 'small',
        type: 'error',
        strong: true,
        onClick: (e: MouseEvent) => {
          e.stopPropagation() // Prevent row click event
          emit('delete-row', row)
        },
      },
      {
        icon: () =>
          h(NIcon, null, {
            default: () => h(DeleteForeverRound),
          }),
      }
    )
  },
} 
  
  
]

 const rowProps = (row: any) => {
    return {
      style: 'cursor: pointer;',
      onClick: () => {
        emit('row-click', row)
      }
    }
}
watch(() => props.data, (newValue) => {
  data.value = newValue
})

</script>

<style lang="scss" scoped>
.container {
  width: 620px;
  .notification-table {
    width: 600px;
    height: calc(100vh - 250px);
  }
}
</style>
