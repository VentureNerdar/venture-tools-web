<template>
  <GenericsActionBar>

    <template #left>
      <b>{{ isMobile ? ' ' : h.translate('manage_users') }}</b>
    </template>

    <template #right>
      <div :style="`${isMobile ? 'padding-right: 10px; margin-top: 10px;' : ''}`">
        <ModalsUserRole />
      </div>
    </template>
  </GenericsActionBar>

  <DisplaysDataTable
    :module="module"
    :store-options="d.storeOptions"
    :form-modal-options="d.formModalOptions"
    :search-by-field-name="d.searchByFieldName"
    :get-all="false"
  />

</template>

<script
  lang="ts"
  setup
>
  import type { StoreOptions, FormModalOptions } from '~/types/index.d'
  import type { Module } from '~/utils/modules'
  import { RoutePaths } from '~/types/index.d'

  import modules from '~/utils/modules'
  const { isMobile } = useDevice()

  const getMovement = async () => {
    const response = await consume.movements.browse({
      all: true
    })

    return response.map((movement: any) => ({
      label: movement.name,
      value: movement.id
    }))
  }

  const movements = ref([])
  const module = reactive({ ...modules.users })

  const h = useHelpers()

  const consume = {
    movements: useConsumeApi(RoutePaths.MOVEMENTS)
  }

  // data
  const d = reactive({
    loading: {
      page: false
    },

    // Change to the field that you want to search.
    searchByFieldName: 'name',

    // All store options getting from module. No need to change
    storeOptions: {
      storeState: module.store.user,
      ...module.options.store
    } as StoreOptions,

    // All form options getting from module. No need to change
    formModalOptions: {
      moduleName: module.name,
      components: {
        formComponent: module.form.component,
        buttonIconComponent: module.form.createButtonIconComponent
      },
      routePath: module.routePath,
      width: module.form.modalWidthSize,
      hiddenFieldsOnEdit: module.dataTable.hiddenFieldsOnEdit,
      form: module.form.model
    } as FormModalOptions,
  })


  onBeforeMount(async () => {
    if (Array.isArray(module.options.filter)) {
      await nextTick()
      movements.value = await getMovement()

      module.options.filter = [
        ...module.options.filter,
        {
          name: 'Movement',
          whereFieldIs: 'movement_id',
          values: movements.value
        }
      ]
    }
  })

</script>

<style></style>