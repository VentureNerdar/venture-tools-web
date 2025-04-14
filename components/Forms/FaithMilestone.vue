<template>
  <n-form
    ref="formRef"
    :model="d.model"
    :rules="translatedRules"
    label-placement="top"
    size="small"
    label-width="150px"
  >

    {{ p.editData }}

    <!-- Name -->
    <n-form-item
      path="name"
      :label="translatedWord('name')"
    >
      <n-input v-model:value="d.model.name" :placeholder="translatedWord('please_input')" />
    </n-form-item> <!-- e.o Name -->

    <!-- Description -->
    <n-form-item
      path="icon"
      :label="translatedWord('icon')"
    >
      <n-space :size="10">
        <n-avatar
          v-if="d.model.icon !== null"
          size="small"
          :src="conf.public.rootURL + d.model.icon"
          style="padding: 5px;"
        />

        <n-upload
          :action="d.uploadLink"
          :headers="d.headers"
          :show-file-list="false"
          :data="{ ...d.data }"
          name="icon"
          @finish="m.handle.upload.finished"
        >
          <n-button>{{ d.model.icon !== null ? translatedWord('change_icon') : translatedWord('upload_icon') }}</n-button>
        </n-upload>
      </n-space>
    </n-form-item> <!-- e.o Name -->

  </n-form>
</template>

<script
  lang="ts"
  setup
>

  // Imports
  // mandatory . standard imports. need for all forms.
  import type {
    FormInst,
    FormRules,
  } from 'naive-ui'
  import modules from '~/utils/modules'

  // mandatory . variable form model types.
  import type { FaithMilestoneFormModel } from '~/types'

  // optional . modular imports based on what the module form need 
  // mostly for computes
  import { useUserStore } from '~/stores/useUsersStore'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  // e.o Imports

  const conf = useRuntimeConfig()

  // mandatory . defining a model ref type. change the ref
  type ModelRefType = Ref<FaithMilestoneFormModel>

  // Self Ref : Need to set a module
  const module = modules.faithMilestones
  const emit = defineEmits(['formChanged', 'beingUploaded'])
  // Language Switching
  const words = useLanguagesStore().words
  const usrPreferLang = useSettingStore().currentPreferredLanguage
  const helpers = useHelpers();
  const translatedWord = (key: string) => {
    return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
  };
  // e.o Language Switching

  // props
  // Self Ref : Need to change editData form model type
  // editData: false | < what form model ? >
  const p = withDefaults(defineProps<{
    editData: false | FaithMilestoneFormModel,
    hiddenFieldsOnEdit: string[]
  }>(), {
    editData: false,
    hiddenFieldsOnEdit: () => {
      return []
    }
  }) // e.o p

  /**
   * formRef for the form
   */
  const formRef = ref<FormInst | null>(null)

  /**
   * Form Rules.
   * Its spreaded from the {@link Module}
   */
  const rules: FormRules = { ...module.form.rules }

   const toSnakeCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[.\s]+/g, '_')
    .replace(/^_+|_+$/g, '');
  };


  const translatedRules = computed(() => {
    const result: Record<string, any[]> = {};

    for (const key in rules) {
      result[key] = (rules[key] as FormRules[]).map((rule:any) => {
        
        return {
          ...rule,
          message: translatedWord(toSnakeCase(rule.message)),
        };
      });
    }

    return result;
  });

  /** Model Ref
   * It is defined to whether create or edit.
   * If edit , it gets from `p.editData`.
   * If create, it gets from `module.form.model`.
   * 
   * SELF REF:
   * Need to change form model type. 2 places.
   * ref<"FORM_MODEL"> and as "FORM_MODEL" at the end
   */

  const modelRef: ModelRefType = ref({ ...p.editData !== false ? p.editData : module.form.model as FaithMilestoneFormModel })

  // data
  const d = reactive({
    model: modelRef,
    uploadLink: conf.public.apiURL + 'faith-milestones/upload-icon',
    headers: {
      Authorization: localStorage.getItem('Bearer') || '',
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data'
    },
    data: {}
  }) // e.o d

  // Computes that need for the form

  const userRoleOptions = computed(() => {

    return useUserStore().userRoles.map((role: any) => ({
      label: role.label,
      value: role.id
    })).reverse()

  })

  const languageOptions = computed(() => {

    return useLanguagesStore().languages.map((language: any) => ({
      label: language.name,
      value: language.id,
    }))

  })

  // e.o Computes that need for the form

  watch(() => d.model, (newVal) => {
    // d.model.password_confirmation = d.model.password
    emit('formChanged', d.model)
  }, { deep: true })

  const m = {
    handle: {
      upload: {
        finished: (param: any) => {
          const file = JSON.parse(param.event.target.response)
          d.model.icon = file.icon
          emit('beingUploaded', false)
          emit('formChanged', d.model)
        },

        beforeUpload: () => {
          console.log('hihi')
          emit('beingUploaded', true)
        }
      }
    }
  }

  if (p.editData) {
    d.data = {
      id: p.editData.id
    }
  }

</script>

<style></style>