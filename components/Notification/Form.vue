<template>
  <n-card>
    <n-form :model="form" :rules="rules" ref="formRef">
      <n-form-item :label="helpers.translate('title')" prop="title" path="title">
        <n-input v-model:value="form.title" :placeholder="helpers.translate('please_input')" />
      </n-form-item>
      <n-form-item :label="helpers.translate('body')" prop="body" path="body">
        <n-input v-model:value="form.body" :placeholder="helpers.translate('please_input')" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleSubmit">{{ helpers.translate('send') }}</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})


const emit = defineEmits(['update:form'])
const helpers = useHelpers();

const form = ref({
  title: props.form.title,
  body: props.form.body,
})

const formRef = ref<FormInst | null>(null)

watch(() => props.form, (newValue) => {
  form.value.title = newValue.title
  form.value.body = newValue.body
}, { deep: true })
// translate the rules
const rules = {
  title: { required: true, message: helpers.translate('title_is_required'), trigger: 'blur' },
  body: { required: true, message: helpers.translate('body_is_required'), trigger: 'blur' },
}

const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('update:form', form.value)
    }
  })
  
  // emit('update:form', form.value)
}

</script>

<style lang="scss" scoped>
</style>

