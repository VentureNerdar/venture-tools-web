<template>
  <n-modal
    :show="showModal"
    transform-origin="center"
    :trap-focus="true"
    :mask-closable="false"
  >
    <n-card
      style="width: 600px"
      :title="`${p.editData ? 'Edit' : 'Create'} Word`"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <div v-if="d.editData !== false">
        <n-input
          type="text"
          placeholder="Input a word"
          :value="d.editData.word"
          size="small"
          @input="m.handleEditWord"
        />

      </div>

      <template #footer>
        <n-flex justify="end">
          <n-button
            type="default"
            size="small"
            @click="m.handleCloseModal"
          >
            Cancel
          </n-button>

          <n-button
            type="primary"
            size="small"
            @click="m.handleSave"
          >
            Save
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
  import { RoutePaths } from '~/types/index.d'
  import type { StoreOptions, FilterOptions, FormModalOptions } from '~/types/index.d'

  const model = RoutePaths.LANGUAGE_WORDS

  const emit = defineEmits(['modalClosed'])

  const p = withDefaults(defineProps<{
    showModal: boolean,
    editData: false | {
      id: number,
      word: string,
    },
    storeOptions: StoreOptions,
  }>(), {
    showModal: false,
    storeOptions: () => {
      return {
        storeState: useLanguagesStore().languages,
        isPersist: true,
        key: 'users',
      } as StoreOptions
    }
  })

  const d = reactive({
    editData: JSON.parse(JSON.stringify(p.editData)),
  })

  const m = {
    handleCloseModal() {
      emit('modalClosed')
    },

    handleSave: async () => {
      const consume = useConsumeApi(model, p.editData !== false ? p.editData.id : undefined)
      await consume.save(d.editData, p.storeOptions)
      emit('modalClosed')
    },

    handleEditWord(word: string) {
      if (d.editData) {
        const underScoredWord = word.replace(/[\s\-–—]/g, '_').toLowerCase()
        d.editData.word = underScoredWord

        if (d.editData.id) {
          d.editData.id = d.editData.id
        }
      }
    },

    helper: {
      hasUpdate(api: any): api is { update: (data: any) => void } {
        return typeof api.update === 'function'
      }
    }
  }

  watch(() => p.editData, (value) => {
    if (value) {

      d.editData = JSON.parse(JSON.stringify(value))

    } else {

      d.editData = {
        word: ''
      }

    }
  })

</script>

<style></style>