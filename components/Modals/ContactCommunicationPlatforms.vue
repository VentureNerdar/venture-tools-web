<template>
  <n-card size="small">
    <n-space vertical :size="10">
      <div>
        <b>
          {{ p.platform.name }}
        </b>
      </div>

      <div>
        <n-space :size="10" vertical>
          <n-flex
            justify="space-between"
            v-for="value in p.contactCommunicationPlatforms[p.platform.id]"
          >
            <n-ellipsis style="max-width: calc(100% - 74px)">
              {{ value }}
            </n-ellipsis>

            <n-space :size="10">
              <n-button
                size="tiny"
                type="warning"
                secondary
                @click="m.handle.click.buttonEdit(value)"
              >
                <template #icon>
                  <EditNoteRound />
                </template>
              </n-button>

              <n-button
                size="tiny"
                type="error"
                secondary
                @click="m.handle.click.buttonDelete(value)"
              >
                <template #icon>
                  <CloseRound />
                </template>
              </n-button>
            </n-space>
          </n-flex>
        </n-space>
      </div>

      <div>
        <n-button
          type="default"
          style="width: 100%"
          dashed
          @click="m.handle.click.buttonAdd"
        >
           {{translatedWord('add')}} {{ p.platform.name }}
        </n-button>
      </div>
      <div></div>
    </n-space>
  </n-card>

  <n-modal v-model:show="d.show.modal" transform-origin="center">
    <n-card
      style="width: 600px"
      :title="d.modal.title"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>

      <n-input
        size="small"
        v-model:value="d.value"
        :placeholder="`Enter ${p.platform.name}`"
      />

      <template #footer>
        <n-flex justify="end">
          <n-button
            size="small"
            type="default"
            tertiar
            @click="m.handle.click.buttonCancel"
            >{{ translatedWord('cancel') }}</n-button
          >

          <n-button
            size="small"
            type="primary"
            @click="m.handle.click.buttonSave"
            >{{ translatedWord('save') }}</n-button
          >
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { CloseRound, EditNoteRound } from "@vicons/material"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"

const p = defineProps<{
  platform: any
  contactCommunicationPlatforms: any
}>()

const emit = defineEmits(["saveClicked", "editClicked", "deleteClicked"])
// Language Switching
const words = useLanguagesStore().words
const usrPreferLang = useSettingStore().currentPreferredLanguage
const helpers = useHelpers();
const translatedWord = (key: string) => {
  return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
};
// e.o Language Switching

const d = reactive({
  value: "",
  editValue: "",
  modal: {
    title: "",
  },
  show: {
    modal: false,
  },
})

const m = {
  handle: {
    click: {
      buttonAdd: () => {
        d.modal.title = translatedWord('add') + ' ' + p.platform.name
        d.show.modal = true
      },

      buttonCancel: () => {
        d.show.modal = false
        d.value = ""
      },

      buttonSave: () => {
        d.show.modal = false
        emit(d.editValue !== "" ? "editClicked" : "saveClicked", {
          id: p.platform.id,
          value: d.value,
          editValue: d.editValue,
        })
        d.value = ""
      },

      buttonEdit: (value: string) => {
        ;(d.editValue = value), (d.value = value)
        d.show.modal = true
      },

      buttonDelete: (value: string) => {
        emit("deleteClicked", {
          id: p.platform.id,
          value: value,
        })
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
