<template>
  <!-- MODAL -->
  <n-modal
    v-model:show="showModal"
    transform-origin="center"
    :trap-focus="true"
    :mask-closable="false"
    @esc="m.handle.click.buttonCancel"
  >

    <n-card
      :style="`width: ${formModalOptions.width ? formModalOptions.width : '600px'}; max-height: calc(100vh - 40px);`"
      :title="`${p.form === false ? translatedWord('create') : translatedWord('edit')} ${translatedModule.moduleName}`"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
      </template>


      <!-- FORM COMPONENT -->
      <n-scrollbar style="max-height: calc(100vh - 140px); right: -10px;">
        <div style="padding-right: 20px;">
          <component
            :is="formModalOptions.components.formComponent"
            :hidden-fields-on-edit="formModalOptions.hiddenFieldsOnEdit"
            :edit-data="p.form"
            @formChanged="m.handle.emit.formChanged"
            @beingUploaded="m.handle.emit.beingUploaded"
          /> <!-- e.o FORM COMPONENT -->
        </div>
      </n-scrollbar>

      <!-- FOOTER -->
      <template #footer>
        <n-flex justify="end">
          <n-space :size="10">
            <n-button
              type="default"
              size="small"
              :disabled="d.disabled.btn.save"
              @click="m.handle.click.buttonCancel"
            >
              {{ translatedWord('cancel') }}
            </n-button>
            <n-button
              type="primary"
              size="small"
              :disabled="d.disabled.btn.save"
              @click="m.handle.click.buttonSave"
            >
              {{ translatedWord('save') }}
            </n-button>
          </n-space>
        </n-flex>
      </template> <!-- e.o FOOTER -->

    </n-card>
  </n-modal> <!-- e.o MODAL -->

</template>

<script
  lang="ts"
  setup
>
  import { useMessage, useNotification } from 'naive-ui'
import { useLanguagesStore } from '~/stores/useLanguagesStore'
import { useSettingStore } from '~/stores/useSettingsStore'
  import type { FormModalOptions, FormModel, RoutePaths, StoreOptions } from '~/types'

  const emit = defineEmits(['closeModal'])
  // Language Switching
  const words = useLanguagesStore().words
  const usrPreferLang = useSettingStore().currentPreferredLanguage
  const helpers = useHelpers();
  const translatedWord = (key: string) => {
    return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
  };
  // e.o Language Switching

  const p = withDefaults(defineProps<{
    showModal: boolean
    formModalOptions: FormModalOptions
    form: false | FormModel
    storeOptions: StoreOptions
    routePath: RoutePaths
  }>(), {
    showModal: false
  })

  const toSnakeCase = (str:string) => {
  return str.toLowerCase().replace(/\s+/g, '_')
}
  const translatedModule = computed(()=> {
    let key
    if(p.formModalOptions.moduleName) {
       key = toSnakeCase(p.formModalOptions.moduleName)
    }
    return {
      ...p.formModalOptions,
      moduleName: key ? translatedWord(key) : p.formModalOptions.moduleName
    }
  })
 

  const d = reactive({
    form: '' as any,
    disabled: {
      btn: {
        save: false as boolean
      }
    }
  })

  const m = {

    handle: {
      emit: {
        formChanged: (form: FormModel) => {
          d.form = form
        },

        beingUploaded: (state: boolean) => {
          console.log('hi')
          d.disabled.btn.save = state
        }
      }, // e.o changed

      click: {
        buttonSave: async () => {
          const consume = useConsumeApi(p.routePath, p.form !== false ? d.form.id : undefined)
          await consume.save(d.form, p.storeOptions)

          emit('closeModal', true)
        },

        buttonCancel: () => {
          emit('closeModal', false)
        }
      } // e.o click
    } // e.o handle

  } // e.o m

  const showModal = computed(() => {
    return p.showModal
  })

</script>

<style></style>