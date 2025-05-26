<template>
  <n-card>
    <n-form :model="form" :rules="rules" ref="formRef">
      <n-form-item label="Title" prop="title">
        <n-input v-model:value="form.title" />
      </n-form-item>
      <n-form-item label="Body" prop="body">
        <n-input v-model:value="form.body"/>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleSubmit">Send</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:form'])

const form = ref({
  title: props.form.title,
  body: props.form.body,
})

watch(() => props.form, (newValue) => {
  form.value.title = newValue.title
  form.value.body = newValue.body
}, { deep: true })

const rules = ref({
  title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
  body: [{ required: true, message: 'Body is required', trigger: 'blur' }],
})

const handleSubmit = () => {
  emit('update:form', form.value)
}
</script>

<style lang="scss" scoped>
</style>
