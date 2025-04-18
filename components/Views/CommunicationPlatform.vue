<template>
  <div>
    <n-space
      :size="10"
      vertical
    >
      <n-alert
        v-if="data.deleted_at !== null"
        type="error"
      >
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
        {{ h.translate('this_communication_platform_is_in_trash') }}
      </n-alert>

      <n-table :single-line="false">
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('name') }} :</b> &nbsp; {{ data.name }}
            </td>
          </tr>

        </tbody>
      </n-table>

      <n-table
        :bordered="true"
        :single-line="false"
      >
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('created_at') }}</b> &nbsp;
              <n-text
                tag="div"
                code
              >{{ data.created_at }}</n-text>
            </td>
            <td>
              <b>{{ h.translate('updated_at') }}</b> &nbsp;
              <n-text
                tag="div"
                code
              >{{ data.updated_at }}</n-text>
            </td>
            <td>
              <b>{{ h.translate('deleted_at') }}</b> &nbsp;
              <n-text
                tag="div"
                code
              >{{ data.deleted_at ? data.deleted_at : 'N/A' }}</n-text>
            </td>
          </tr>
        </tbody>

      </n-table>
    </n-space>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound } from '@vicons/material'

  const emit = defineEmits(['modalTitle'])
  const h = useHelpers()

  const p = withDefaults(defineProps<{
    id: number,
    data: any
  }>(), {
  })

  emit('modalTitle', p.data.name)

</script>

<style
  scoped
  lang="scss"
>
  .wrap-info {
    margin-top: 10px;
  }
</style>