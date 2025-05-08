<template>
  <GenericsActionBar>
    <template #left>
      <!-- <b>Manage Contacts</b> -->
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
</template>

<script
  lang="ts"
  setup
>
  import { ref, reactive, h } from 'vue'
  import { NTag } from 'naive-ui'
  import { useSettingStore } from "~/stores/useSettingsStore"
  import type {
    StoreOptions,
    FormModalOptions,
    BrowseCondition,
  } from "~/types/index.d"
  import type { Module } from "~/utils/modules"
  import modules from "~/utils/modules"
  import { useHelpers } from '~/composables/useHelpers'

  const module = modules.contacts as Module
  const settingStore = useSettingStore()
  const helper = useHelpers()

  const d = reactive({
    loading: {
      page: false,
    },

    // Change to the field that you want to search.
    searchByFieldName: "name",

    // All store options getting from module.
    // Need to change storeState
    storeOptions: {
      storeState: module.store.contacts,
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

    // browse options
    browseOptions: {
      with: `["faithMilestones", "status", "faithStatus", "assignedTo", "coachedBy", "peopleGroup", "baptizedBy", "contactCommunicationPlatforms"]`,
    } as BrowseCondition,
  })

  const m = {
    render: {
      contactStatusColumn: () => {
        const contactStatusColumn = module.dataTable.columns.find(
          (c: any) => c.title === "Contact Status",
        )

        if (contactStatusColumn !== undefined) {
          contactStatusColumn.render = (row: any) => {
            const status = settingStore.contactStatuses.find(
              (cs: any) => cs.id === row.contact_status_id,
            )
            let statusName = status !== undefined ? status.name : "N/A"

            statusName = helper.translate(helper.toSnakeCase(statusName))

            let tagType = ""
            switch (row.contact_status_id) {
              case 1:
                tagType = "success"
                break
              case 2:
                tagType = "warning"
                break
              case 3:
                tagType = "default"
                break
              case 4:
                tagType = "primary"
                break
              case 5:
                tagType = "error"
                break
              default:
                tagType = "default"
                break
            }

            return h(
              NTag,
              {
                type: tagType,
                bordered: false,
                style: {
                  marginRight: "6px",
                },
              },
              {
                default: () => statusName,
              },
            )
          }
        }
      },
    },
  }

  m.render.contactStatusColumn()
</script>

<style></style>
