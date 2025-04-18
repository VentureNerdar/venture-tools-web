<template>
  <GenericsActionBar>
    <template #left>
      <b>{{ h.translate('manage_users') }}</b>
    </template>

    <template #right>
      <ModalsUserRole />
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
  import modules from '~/utils/modules'

  const module = modules.users as Module
const h = useHelpers()

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

</script>

<style></style>