<template>
  <div class="container">
    <div>
      <NotificationTable @row-click="handleRowClick" />
    </div>
    <div class="form-container">
      <NotificationForm v-model:form="form" @update:form="handleFormUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  title: '',
  body: '',
})

const handleRowClick = (row: any) => {
  form.value.title = row.title
  form.value.body = row.body
}

const handleFormUpdate = (form: any) => {
  console.log('Form updated Final:', form)
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 10px;
  .form-container {
    width: 100%;
  }
}
</style>
