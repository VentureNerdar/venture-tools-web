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
        This user role is in trash.
      </n-alert>

      <n-table :single-line="false">
        <tbody>
          <tr>
            <td>
              <b>Name :</b> &nbsp; {{ data.name }}
            </td>
            <td>
              <b>Label :</b> &nbsp;
              {{ data.label }}
            </td>
          </tr>


          <tr>
            <td colspan="2">
              <div><b>Description</b></div>
              <p>{{ data.description }}</p>
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
              <b>Created At</b> &nbsp;
              <n-text
                tag="div"
                code
              >{{ data.created_at }}</n-text>
            </td>
            <td>
              <b>Updated At</b> &nbsp;
              <n-text
                tag="div"
                code
              >{{ data.updated_at }}</n-text>
            </td>
            <td>
              <b>Deleted At</b> &nbsp;
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
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useUserStore } from '~/stores/useUsersStore'

  const emit = defineEmits(['modalTitle'])

  const p = withDefaults(defineProps<{
    id: number,
    data: any
  }>(), {
  })

  const s = {
    userRole: useUserStore(),
    systemLanguages: useLanguagesStore()
  }

  const m = {
    userRole: (roleID: number) => {

      const role = s.userRole.userRoles.find((role: any) => role.id === roleID)
      return role ? role.name.toUpperCase() : 'N/A'

    },

    languagePreference: (languageID: number) => {
      const language = s.systemLanguages.languages.find((lang: any) => lang.id === languageID)
      return language ? language.name : 'N/A'
    }
  }

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