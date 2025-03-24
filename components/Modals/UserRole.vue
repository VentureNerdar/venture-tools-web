<template>
  <n-button
    type="primary"
    size="small"
    @click="d.visibility.modal = true"
  >
    User Role
  </n-button>

  <n-modal
    v-model:show="d.visibility.modal"
    transform-origin="center"
  >
    <n-card
      style="width: calc(100vw - 40px); height: calc(100vh - 40px)"
      title="Manage User Roles"
      :bordered="true"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
      </template>

      <DisplaysDataTable
        :get-all="true"
        :module="module"
        :store-options="d.storeOptions"
        :form-modal-options="d.formModalOptions"
        :search-by-field-name="d.searchByFieldName"
      />


      <template #footer>
        <n-flex justify="end">
          <n-button
            size="small"
            type="default"
            @click="d.visibility.modal = false"
          >
            Close
          </n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script
  lang="ts"
  setup
>

  import type { StoreOptions, FormModalOptions } from '~/types/index.d'
  import type { Module } from '~/utils/modules'
  import modules from '~/utils/modules'


  const module = modules.userRoles as Module

  // data
  const d = reactive({
    visibility: {
      modal: false
    },
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