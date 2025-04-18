<template>
  <n-scrollbar style="max-height: calc(100vh - 120px);">

    <n-spin :show="d.loading.page">
      <GenericsActionBar>
        <template #left>
          <b>{{ h.translate('manage_system_languages') }}</b>
        </template>

        <template #right>
          <div>
            <n-select
              :placeholder="h.translate('select_language')"
              v-model:value="selectedLanguage"
              :options="languageOptions"
              style="width: 200px;"
            />
          </div>
        </template>
      </GenericsActionBar>

      <n-card size="small">
        <n-space
          vertical
          :size="10"
        >

          <n-input-group>
            <n-input
              type="text"
              :placeholder="h.translate('search_word')"
              clearable
              size="small"
              @input="m.handle.change.searchInput"
            />

            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button
                  type="success"
                  secondary
                  size="small"
                  @click="m.handle.click.createWordButton"
                >
                  <template #icon>
                    <PlusRound />
                  </template>
                </n-button>

              </template>
              {{ h.translate('create_word') }}
            </n-tooltip>


          </n-input-group>
          <n-table
            :bordered="true"
            :single-line="true"
            class="lang-table"
            size="small"
          >
            <thead>
              <tr>
                <th width="470px">Word</th>
                <th style="width: 120px; text-align: center;"></th>
                <th style="width: 50%;">{{ h.translate('translation') }}</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="word in d.data.words"
                :key="word.id"
              >
                <td>
                  <n-ellipsis style="max-width: 400px;">
                    {{ word.word }}
                  </n-ellipsis>
                </td>
                <td>
                  <div class="controls">
                    <n-flex justify="center">
                      <n-button
                        type="warning"
                        secondary
                        size="small"
                        @click="m.handle.openEditModal(word)"
                      >
                        <template #icon>
                          <EditRound />
                        </template>
                      </n-button>

                      <ModalsGenericDelete
                        :id="word.id"
                        :model="models.words"
                        @delete-progress="m.handle.deleted"
                      />
                    </n-flex>
                  </div>
                </td>
                <td>
                  <n-input
                    type="text"
                    :placeholder="h.translate('input_a_translated_word')"
                    :value="m.getTranslatedWord(word.id)"
                    :disabled="!selectedLanguage"
                    size="small"
                  />

                </td>
              </tr>
            </tbody>
          </n-table>

        </n-space>
      </n-card>
    </n-spin>

    <ModalsSystemLanguageWord
      :show-modal="d.show.editModal"
      :edit-data="d.data.editData"
      :store-options="d.formStoreOptions"
      @modal-closed="m.handle.modalClosed"
    />
  </n-scrollbar>

</template>

<script
  lang="ts"
  setup
>

  import { PlusRound, EditRound } from '@vicons/material'
  import { RoutePaths } from '~/types/index.d'
  import type { StoreOptions } from '~/types/index.d'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'

  const selectedLanguage = ref(null)
  const h = useHelpers();

  const models = {
    languages: RoutePaths.LANGUAGES,
    words: RoutePaths.LANGUAGE_WORDS,
  }

  const u = {
    consumeLanguages: useConsumeApi(models.languages),
    consumeWords: useConsumeApi(models.words),
  }

  const d = reactive({
    formStoreOptions: {} as StoreOptions,
    loading: {
      page: false,
    },

    show: {
      editModal: false
    },

    data: {
      languages: [] as any,
      words: [] as any,
      initial_words: [] as any,
      editData: { id: 0, word: '' } as any,
    },

    languagesStoreOptions: {
      storeState: useLanguagesStore().languages,
      isPersist: true,
      key: 'languages'
    } as StoreOptions,

    wordsStoreOptions: {
      storeState: useLanguagesStore().words,
      isPersist: true,
      key: 'words'
    } as StoreOptions,
  })

  const m = {
    getData: async () => {
      d.loading.page = true

      const languageResponse = await u.consumeLanguages.browse({
        all: true,
        with: JSON.stringify(["translations"]),
      }, d.languagesStoreOptions)

      d.data.languages = languageResponse as any

      const wordResponse = await u.consumeWords.browse({
        all: true,
        // with: ['translations'],
      }, d.wordsStoreOptions)

      d.data.words = wordResponse as any
      d.data.initial_words = wordResponse as any

      d.loading.page = false
    },

    getTranslatedWord: (id: number) => {
      const language = d.data.languages.find((language: any) => language.id === selectedLanguage.value)

      let translatedWord = ''

      if (language && language.translations) {
        const translation = language.translations.find((translation: any) => translation.system_language_word_id === id)

        if (translation) {
          translatedWord = translation.translation
        }
      }

      return translatedWord
    },

    handle: {
      change: {
        searchInput: (keyword: string) => {
          const filteredWords = d.data.initial_words.filter((word: any) => word.word.includes(keyword))
          d.data.words = filteredWords
        }
      },

      click: {
        createWordButton: () => {
          d.data.editData = false
          d.data.editData = { id: 0, word: '' }
          d.formStoreOptions = d.wordsStoreOptions
          d.show.editModal = true
        }
      },

      openEditModal: (word: any) => {
        d.show.editModal = true
        d.data.editData = word
      },

      modalClosed: () => {
        m.getData()
        d.show.editModal = false
      },

      deleted: (success: boolean) => {
        if (success) { m.getData() }
      }
    }
  }

  m.getData()

  const languageOptions = computed(() => {
    return d.data.languages.map((language: any) => {
      return {
        label: language.name,
        value: language.id,
      }
    })
  })

</script>

<style
  scoped
  lang="scss"
>
  .lang-table {
    tbody {
      tr {
        td {
          .controls {
            width: 120px;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s ease-in-out;
          }
        }

        &:hover {
          td {
            .controls {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
    }
  }
</style>