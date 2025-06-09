<template>
  <n-card size="small">
    <n-space
      :size="10"
      vertical
    >
      <div>
        <b>{{ h.translate("community_checklist") }}</b>
      </div>
      <div
        v-for="checklist in s.community.communityChecklists"
        :key="checklist.id"
      >
        <n-checkbox
          :checked="m.handle.checklist.isChecked(checklist.id)"
          @update:checked="
            m.handle.click.checkbox.checklist(checklist.id, $event)
          "
        >
          {{ checklist.name }}
        </n-checkbox>
      </div>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import type { CommunityChecklistFormModel } from "~/types"
import { useCommunityStore } from "~/stores/useCommunitiesStore"

const emits = defineEmits(["changed"])

// Language Switching
const h = useHelpers()
// e.o Language Switching

const s = {
  community: useCommunityStore(),
}

const p = defineProps<{
  checklists: CommunityChecklistFormModel[]
}>()

const m = {
  handle: {
    click: {
      checkbox: {
        checklist: (id: number, checked: boolean) => {
          console.log("checklist", id, checked)

          emits("changed", { id: id, checked: checked })
        },
      },
    },

    checklist: {
      isChecked: (checklistId: number) => {
        return (p.checklists ?? []).some((ck: any) => ck === checklistId)
        // return p.checklists.some((ck: any) => ck === checklistId)
      },
    },
  },
}
</script>
