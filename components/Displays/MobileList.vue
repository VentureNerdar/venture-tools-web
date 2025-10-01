<template>
  <div class="wrap-list">
    <n-space
      v-for="data in props.listData"
      :key="data.id"
      class="item"
      vertical
      :size="10"
    >
      <span class="name">
        {{ data.name }}
      </span>


      <div class="button-group">
        <ModalsGenericView
          :id="data.id"
          :data="data"
          :view-component="props.module.view?.component"
          :width="'90%'"
          :button-width="'30%'"
        />

        <n-button
          v-if="!props.isTrashed"
          type="warning"
          secondary
          size="small"
          @click="$emit('editClicked', data)"
        >
          <template #icon>
            <n-icon size="14">
              <EditRound />
            </n-icon>
          </template>
        </n-button>

        <ModalsGenericRestore
          v-if="props.module.hasSoftDelete && props.isTrashed"
          :id="data.id"
          :model="props.module.routePath"
          :button-width="'33%'"
          @restore-progress="emits('delete', $event)"
        />

        <ModalsGenericDelete
          :id="data.id"
          :model="props.module.routePath"
          :permanent="props.module.hasSoftDelete ? props.isTrashed ? true : false : true"
          :button-width="'30%'"
          @delete-progress="emits('delete', $event)"
        />
      </div>
    </n-space>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { NoteRound, TextSnippetRound, EditRound, DeleteRound } from '@vicons/material'
  import GenericView from '../Modals/GenericView.vue'
  import type { Module } from '~/utils/modules'

  const emits = defineEmits(['view', 'editClicked', 'delete'])

  const props = defineProps<{
    listData: any[],
    listColumns: any[],
    module: Module,
    isTrashed: boolean
  }>()

  console.log(props.module)
</script>

<style
  lang="scss"
  scoped
>
  .wrap-list {
    .item {
      background: rgba(255, 255, 255, 0.2);
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;

      .name {
        font-weight: 600;
      }

      .button-group {
        display: flex;
        gap: 8px;

        .n-button {
          flex: 1;
        }
      }
    }
  }
</style>