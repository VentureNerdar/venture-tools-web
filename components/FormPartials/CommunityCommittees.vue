<template>
  <n-space :size="10" vertical>
    <div><b>Committees</b></div>

    <n-empty
      v-if="!p.committees || p.committees.length === 0"
      description="No Community Committees"
    >
      <template #icon>
        <n-icon>
          <GroupOffRound />
        </n-icon>
      </template>
    </n-empty>

    <div v-else>
      <n-list hoverable bordered>
        <n-list-item v-for="committee in d.committees">
          <template #suffix>
            <n-space :size="10" style="width: 70px">
              <n-button
                type="warning"
                size="tiny"
                secondary
                @click="m.handle.click.button.rowEdit(committee)"
              >
                <template #icon>
                  <EditRound />
                </template>
              </n-button>

              <n-button
                type="error"
                size="tiny"
                secondary
                @click="m.handle.click.button.rowDelete(committee)"
              >
                <template #icon>
                  <DeleteRound />
                </template>
              </n-button>
            </n-space>
          </template>

          <!-- <div class="ellipsis"> -->
          <div>
            {{ committee.name }}
          </div>
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
        Add Community Committee
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
      title="Community Committee"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <n-space :size="10" vertical>
        <n-input size="small" v-model:value="d.form.name" placeholder="Name">
          <template #prefix>
            <n-icon :component="GroupsRound" />
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
import type { CommunityCommittee } from "~/types"
import {
  EditRound,
  DeleteRound,
  GroupOffRound,
  PlusRound,
  LocalPhoneRound,
  EmailRound,
  GroupsRound,
} from "@vicons/material"

const emits = defineEmits(["added", "updated", "deleted"])

const p = defineProps<{
  committees: CommunityCommittee[]
}>()

const d = reactive({
  visibility: {
    modal: false,
  },

  form: {
    name: null,
    originalName: null,
  } as CommunityCommittee,

  committees: JSON.parse(JSON.stringify(p.committees ?? [])),

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

          d.visibility.modal = false
        },

        save: () => {
          const form = JSON.parse(JSON.stringify(d.form))
          console.log(form)
          emits(d.mode === "add" ? "added" : "updated", form)
          d.visibility.modal = false

          d.form.name = null
        },

        rowDelete: (pp: any) => {
          emits("deleted", pp)
        },

        rowEdit: (pp: any) => {
          d.mode = "edit"

          d.form.name = pp.name
          d.form.originalName = pp.originalName ? pp.originalName : pp.name

          console.log(d.form)

          d.visibility.modal = true
        },
      },
    },
  },
}

watch(
  () => p.committees,
  (committees) => {
    const cc = [...committees] as CommunityCommittee[]

    cc.forEach((pp: CommunityCommittee) => {
      pp.originalName = pp.name
    })

    d.committees = JSON.parse(JSON.stringify(cc))
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
.ellipsis {
  width: calc(100% - 72px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
