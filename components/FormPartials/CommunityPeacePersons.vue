<template>
  <n-space :size="10" vertical>
    <div><b>Person of Peace</b></div>

    <n-empty
      v-if="!p.peacePersons || p.peacePersons.length === 0"
      description="No Person of Peace"
    >
      <template #icon>
        <n-icon>
          <NoAccountsRound />
        </n-icon>
      </template>
    </n-empty>

    <div v-else>
      <n-list hoverable bordered>
        <n-list-item v-for="pp in d.peacePersons">
          <template #suffix>
            <n-space :size="10" style="width: 70px">
              <n-button
                type="warning"
                size="tiny"
                secondary
                @click="m.handle.click.button.rowEdit(pp)"
              >
                <template #icon>
                  <EditRound />
                </template>
              </n-button>

              <n-button
                type="error"
                size="tiny"
                secondary
                @click="m.handle.click.button.rowDelete(pp)"
              >
                <template #icon>
                  <DeleteRound />
                </template>
              </n-button>
            </n-space>
          </template>

          <n-space :size="10" vertical>
            <b>{{ pp.name }}</b>

            <n-text :depth="3">
              <n-icon size="small" :component="EmailRound" /> {{ pp.email }}

              &nbsp;&nbsp;

              <n-icon size="small" :component="LocalPhoneRound" />
              {{ pp.phone }}
            </n-text>
          </n-space>
        </n-list-item>
      </n-list>
    </div>

    <!-- Modal Button -->
    <div>
      <n-button
        type="default"
        size="small"
        style="width: 100%"
        @click="m.handle.click.button.modal"
      >
        <template #icon>
          <PlusRound />
        </template>
        Add Person of Peace
      </n-button>
    </div>
    <!-- e.o Modal Button -->
  </n-space>

  <n-modal
    v-model:show="d.visibility.modal"
    transform-origin="center"
    :mask-closable="false"
  >
    <n-card
      style="width: 600px"
      title="Person of Peace"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <n-space :size="10" vertical>
        <n-input size="small" v-model:value="d.form.name" placeholder="Name">
          <template #prefix>
            <n-icon :component="PersonRound" />
          </template>
        </n-input>
        <n-input size="small" v-model:value="d.form.email" placeholder="Email">
          <template #prefix>
            <n-icon :component="EmailRound" />
          </template>
        </n-input>
        <n-input size="small" v-model:value="d.form.phone" placeholder="Phone">
          <template #prefix>
            <n-icon :component="LocalPhoneRound" />
          </template>
        </n-input>
      </n-space>

      <template #footer>
        <n-flex justify="end">
          <n-button
            type="default"
            @click="m.handle.click.button.cancel"
            size="small"
            >Cancel</n-button
          >

          <n-button
            type="primary"
            @click="m.handle.click.button.save"
            size="small"
            >Save</n-button
          >
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import type { CommunityPeacePersonFormModel } from "~/types"
import {
  EditRound,
  DeleteRound,
  NoAccountsRound,
  PlusRound,
  LocalPhoneRound,
  EmailRound,
  PersonRound,
} from "@vicons/material"

const emits = defineEmits(["added", "updated", "deleted"])

const p = defineProps<{
  peacePersons: CommunityPeacePersonFormModel[]
}>()

const d = reactive({
  visibility: {
    modal: false,
  },

  form: {
    name: null,
    email: null,
    phone: null,
    originalName: null,
  } as CommunityPeacePersonFormModel,

  peacePersons: JSON.parse(JSON.stringify(p.peacePersons ?? [])),

  mode: "add" as "add" | "edit",
})

const m = {
  handle: {
    click: {
      button: {
        modal: () => {
          d.mode === "add"
          d.visibility.modal = true
        },

        cancel: () => {
          d.form.name = null
          d.form.email = null
          d.form.phone = null

          d.visibility.modal = false
        },

        save: () => {
          const form = JSON.parse(JSON.stringify(d.form))
          console.log(form)
          emits(d.mode === "add" ? "added" : "updated", form)
          d.visibility.modal = false

          d.form.name = null
          d.form.email = null
          d.form.phone = null
        },

        rowDelete: (pp: any) => {
          emits("deleted", pp)
        },

        rowEdit: (pp: any) => {
          d.mode = "edit"

          d.form.name = pp.name
          d.form.email = pp.email
          d.form.phone = pp.phone
          d.form.originalName = pp.originalName ? pp.originalName : pp.name

          console.log(d.form)

          d.visibility.modal = true
        },
      },
    },
  },
}

watch(
  () => p.peacePersons,
  (peacePersons) => {
    const pp = [...peacePersons] as CommunityPeacePersonFormModel[]

    pp.forEach((pp: CommunityPeacePersonFormModel) => {
      pp.originalName = pp.name
    })

    d.peacePersons = JSON.parse(JSON.stringify(pp))
  },
  { deep: true },
)
</script>
