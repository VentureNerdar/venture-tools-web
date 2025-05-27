<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :remote="true"
      :loading="loading"
      v-model:pagination="pagination"
      max-height="calc(100vh - 304px)"
      />
  </div>
</template>

<script lang="ts" setup>
import { useConsumeApi } from '~/composables/useConsumeApi'
import type { UserFormModel } from '~/types/models'
import { RoutePaths } from '~/types/index.d'
import { NSwitch } from 'naive-ui'

const movementUserModel = RoutePaths.MOVEMENT_USERS
const consumeUser = useConsumeApi(movementUserModel)
const helpers = useHelpers();

const data = ref<UserFormModel[]>([])
const loading = ref(false)
const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20, 30, 40],
  itemCount: 0,
  onChange: (page: number) => {
    pagination.page = page
    fetchData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    fetchData()
  }
})

const columns = computed(() => [
  {
    title: helpers.translate('name'),
    width: 200,
    key: 'name',
  },
  {
    title: helpers.translate('email'),
    width: 200,
    key: 'email'
  },
  {
    title: helpers.translate('phone'),
    width: 200,
    key: 'phone_number'
  },
  {
    title: helpers.translate('verified'),
    width: 200,
    key: 'is_verified',
    render(row: UserFormModel) {
      return h(NSwitch, {
        value: row.is_verified,
        size: 'small',
        'onUpdate:value': async (value: boolean) => {
          if(row.is_verified) {
            return 
          }
          const currentUser = data.value.find(user => user.id === row.id)
          if (currentUser) {
            const formData = {
              user_id: row.id, 
            }
            const model = RoutePaths.MOVEMENT_USER_VERIFICATIONS
            const consume = useConsumeApi(model)
            const response = await consume.save(formData)
            if (response) {
              currentUser.is_verified = response.is_verified
            }
          }
        }
      })
    }
  }
])

const fetchData = async () => {
  loading.value = true
  const bc = {
    all: false,
    page: pagination.page,
    per_page: pagination.pageSize
  }
  try {
    const response = await consumeUser.browse(bc)
    if (response) {
      data.value = response.data as UserFormModel[]
      pagination.itemCount = response.total
    }
  } catch (error) {
    console.error("Failed to fetch data", error)
  } finally {
    loading.value = false
  }
}

fetchData()
</script>

<style lang="scss" scoped>

</style>
