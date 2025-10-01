<template>
  <GenericsActionBar v-if="!isMobile">
    <template #left>
      <b>{{ textManagePrayerPrompt }}</b>
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

<script
  lang="ts"
  setup
>
  import type { StoreOptions, FormModalOptions } from "~/types/index.d"
  import type { Module } from "~/utils/modules"
  import modules from "~/utils/modules"

  const module = modules.prayerPrompts as Module
  const h = useHelpers()
  const { isMobile } = useDevice()

  const d = reactive({
    loading: {
      page: false,
    },

    // Change to the field that you want to search.
    searchByFieldName: "prompt_text",

    // All store options getting from module.
    // Need to change storeState

    storeOptions: {
      storeState: module.store.prayerPrompts,
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

  const textManagePrayerPrompt = computed(() => {
    return h.translate("manage_prayer_prompts") === ""
      ? "Manage Prayer Prompt"
      : h.translate("manage_prayer_prompts")
  })
</script>

<style></style>