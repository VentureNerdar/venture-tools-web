<template>
  <n-table
    v-if="!isMobile"
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

  <n-table
    v-else
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
      </tr>
      <tr>
        <td>
          <b>{{ h.translate('updated_at') }}</b> &nbsp;
          <n-text
            tag="div"
            code
          >{{ data.updated_at }}</n-text>
        </td>

      </tr>
      <tr>
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
</template>

<script
  lang="ts"
  setup
>
  const h = useHelpers()
  const { isMobile } = useDevice()

  const p = withDefaults(defineProps<{
    data: any
  }>(), {
  })

</script>

<style></style>