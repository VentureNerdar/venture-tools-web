<template>
  <n-tooltip :delay="400">
    <template #trigger>
      <n-button
        type="info"
        secondary
        size="small"
        @click="m.handle.click.viewModalButton"
      >
        <template #icon>
          <TextSnippetRound />
        </template>
      </n-button>
    </template>
    {{ h.translate('view') }}
  </n-tooltip>

  <!-- modal -->
  <n-modal
    v-model:show="d.showModal"
    transform-origin="center"
    :trap-focus="true"
    :mask-closable="false"
    @esc="m.handle.click.buttonCancel"
  >

    <n-card
      :bordered="true"
      size="small"
      role="dialog"
      :title="h.translate('view') + ' ' + d.modalTitle"
      aria-modal="true"
      :style="`width: ${p.width}; max-height: calc(100vh - 20px);`"
    >

      <template #header-extra>
        <n-space justify="end">

          <n-button
            type="warning"
            secondary
            size="tiny"
            @click="m.handle.click.buttonEdit"
          >
            <template #icon>
              <EditRound />
            </template>
          </n-button>

          <n-button
            type="info"
            secondary
            size="tiny"
            @click="d.showModal = false"
          >
            <template #icon>
              <CloseRound />
            </template>
          </n-button>

        </n-space>
      </template>

      <n-scrollbar style="max-height: calc(100vh - 100px); right: -10px;">
        <div style="padding-right: 20px;">
          <component
            :is="viewComponent"
            :id="p.id"
            :data="p.data"
            @modalTitle="d.modalTitle = $event"
          />
        </div>
      </n-scrollbar>

    </n-card>
  </n-modal>
</template>

<script
  lang="ts"
  setup
>
  import { EditRound, CloseRound } from '@vicons/material'
  import { TextSnippetRound } from '@vicons/material'
  import type { ModalWidthSize } from '~/types'

  const emit = defineEmits(['editButtonClicked'])
  const h = useHelpers()

  const p = withDefaults(defineProps<{
    id: number,
    data: any,
    viewComponent: any,
    width: ModalWidthSize
  }>(), {
  })

  const d = reactive({
    showModal: false,
    modalTitle: ' '
  })

  const m = {
    handle: {
      click: {
        buttonCancel() {
        },

        buttonEdit() {
          d.showModal = false
          emit('editButtonClicked')
        },

        viewModalButton() {
          d.showModal = true
        }
      }
    }
  }
</script>

<style></style>