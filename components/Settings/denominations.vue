<template>
  <GenericsActionBar>
    <template #left>
      <b>{{ h.translate('manage_denominations') }}</b>
    </template>

    <template #right> </template>
  </GenericsActionBar>

  <DisplaysDataTable
    :module="module"
    :store-options="d.storeOptions"
    :form-modal-options="d.formModalOptions"
    :search-by-field-name="d.searchByFieldName"
    :get-all="true"
  />
</template>

<script lang="ts" setup>
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"
import type { StoreOptions, FormModalOptions } from "~/types/index.d"
import type { Module } from "~/utils/modules"
import modules from "~/utils/modules"

const module = modules.denominations as Module
const h = useHelpers()


const d = reactive({
  loading: {
    page: false,
  },

  // Change to the field that you want to search.
  searchByFieldName: "name",

  // All store options getting from module.
  // Need to change storeState

  storeOptions: {
    storeState: module.store.denominations,
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
})
</script>

<style></style>

