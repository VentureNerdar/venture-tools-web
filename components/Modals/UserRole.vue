<template>
  <n-button
    type="primary"
    size="small"
    @click="d.visibility.modal = true"
  >
    {{ translatedWord('user_role') }}
  </n-button>

  <n-modal
    v-model:show="d.visibility.modal"
    transform-origin="center"
  >
    <n-card
      style="width: calc(100vw - 40px); height: calc(100vh - 40px)"
      :title="translatedWord('manage_user_role')"
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
            {{ translatedWord('close') }}
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

  import { useLanguagesStore } from '~/stores/useLanguagesStore'
import { useSettingStore } from '~/stores/useSettingsStore'
import type { StoreOptions, FormModalOptions } from '~/types/index.d'
  import type { Module } from '~/utils/modules'
  import modules from '~/utils/modules'


  const module = modules.userRoles as Module
  // Language Switching
    const words = useLanguagesStore().words
    const usrPreferLang = useSettingStore().currentPreferredLanguage
    const helpers = useHelpers();
    const translatedWord = (key: string) => {
      return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
    };
  // e.o Language Switching

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