<template>
  <div>

    <GenericsActionBar>
      <template #left>
        <!-- <b>Manage </b> -->
      </template>

      <template #right> </template>
    </GenericsActionBar>

    <DisplaysDataTable
      :module="module"
      :store-options="d.storeOptions"
      :form-modal-options="d.formModalOptions"
      :search-by-field-name="d.searchByFieldName"
      :browse-options="d.browseOptions"
      :get-all="false"
    />
  </div>
</template>

<script
  lang="ts"
  setup
>
  import type {
    StoreOptions,
    FormModalOptions,
    BrowseCondition,
  } from "~/types/index.d"
  import type { Module } from "~/utils/modules"
  import modules from "~/utils/modules"

  const module = modules.communities as Module

  const d = reactive({
    loading: {
      page: false,
    },

    // Change to the field that you want to search.
    searchByFieldName: "name",

    // All store options getting from module.
    // Need to change storeState

    storeOptions: {
      storeState: module.store.communities,
      ...module.options.store,
    } as StoreOptions,

    // All form options getting from module. No need to change
    formModalOptions: {
      moduleName: module.name,
      components: {
        formComponent: module.form.component,
        buttonIconComponent: module.form.createButtonIconComponent,
      },
      routePath: module.routePath,
      width: module.form.modalWidthSize,
      hiddenFieldsOnEdit: module.dataTable.hiddenFieldsOnEdit,
      form: module.form.model,
    } as FormModalOptions,

    browseOptions: {
      with: `["peacePersons", "committees", "checklists", "churches", "churches.churchPlanters"]`,
    } as BrowseCondition,
  })
</script>

<style></style>
