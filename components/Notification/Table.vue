<template>
  <n-card size="small" class="container">
    <div class="notification-table">
      <n-data-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        :row-props="rowProps"
        />
    </div>
  </n-card>
</template>

<script setup lang="ts">

const emit = defineEmits(['row-click'])

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

  }
]

const data = [
  {
    title: 'Notification 1',
    body: 'Notification 1 body Example: Do not forget to check Venture Tools and update your church'
  },
  {
    title: 'Notification 2',
    body: 'Notification 2 body'
  },
  {
    title: 'Notification 3',
    body: 'Notification 3 body'
  },
]

 const rowProps = (row: any) => {
    return {
      style: 'cursor: pointer;',
      onClick: () => {
        emit('row-click', row)
      }
    }
}

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
