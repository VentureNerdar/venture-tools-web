<template>
  <div>
    <n-space
      :size="10"
      vertical
    >
      <h2>{{ h.translate('movement.need_to_change') }}</h2>

      <n-alert
        v-if="data.deleted_at !== null"
        type="error"
      >
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
        {{ h.translate('this_movement_is_in_trash') }}
      </n-alert>

      <n-table :single-line="false">
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('name') }} :</b> &nbsp; {{ data.name }}
            </td>
          </tr>

          <tr>
            <td>
              <div><b>{{ h.translate('description') }}</b></div>
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
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useUserStore } from '~/stores/useUsersStore'

  const emit = defineEmits(['modalTitle'])

  const h = useHelpers()

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


