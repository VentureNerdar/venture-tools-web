<template>
  <n-input
    type="text"
    size="small"
    v-model:value="word"
    :placeholder="h.translate('input_a_translated_word')"
    :disabled="props.disabledState"
    @blur="saveWord"
  />
</template>

<script
  lang="ts"
  setup
>
  import { useNotification } from 'naive-ui'
  const h = useHelpers()
  const config = useRuntimeConfig()

  const word = ref<string | null>('')

  const notify = useNotification()

  const props = defineProps({
    wordId: {
      type: Number,
      required: true,
    },
    disabledState: {
      type: Boolean,
      required: true,
    },
    selectedLanguage: {
      type: Number,
    },
    translatedWord: {
      type: Object,
      required: true,
    },
  })

  const d = reactive({
    data: {
      languages: [] as any[],
    },

    selectedTranslation: null as any,

    isNew: false
  })

  const saveWord = async () => {
    const payload = {
      system_language_id: props.selectedLanguage,
      system_language_word_id: props.wordId,
      translation: word.value,
    }

    const token = localStorage.getItem("Bearer") || ""

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as any

    if (token) {
      headers["Authorization"] = token as string
    }

    const route = config.public.apiURL + (d.isNew ? 'languages/translations' : 'languages/translations/' + d.selectedTranslation.id)
    const response = await $fetch(route, {
      method: d.isNew ? 'POST' : 'PUT',
      body: payload,
      headers: headers,
    })

    notify.success({
      title: h.translate('word_saved') === '' ? 'Word Translation Saved.' : h.translate('word_saved'),
      duration: 1500,
    })

  }

  // Watchers
  watch(() => props.selectedLanguage, (newValue) => {
    if (!newValue) return

    const translation = props.translatedWord?.find((t: any) => t.system_language_id === newValue)
    d.isNew = !translation
    d.selectedTranslation = translation || null
    word.value = translation?.translation || ''
  })

</script>

<style></style>