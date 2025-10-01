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
        {{ h.translate('this_user_role_is_in_trash') }}
      </n-alert>

      <n-table
        v-if="!isMobile"
        :single-line="false"
      >
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('name') }} :</b> &nbsp; {{ data.name }}
            </td>
            <td>
              <b>{{ h.translate('label') }} :</b> &nbsp;
              {{ data.label }}
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <div><b>{{ h.translate('description') }}</b></div>
              <p>{{ data.description }}</p>
            </td>
          </tr>
        </tbody>
      </n-table>

      <n-table
        v-else
        :single-line="false"
      >
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('name') }} :</b> &nbsp; {{ data.name }}
            </td>
          </tr>

          <tr>
            <td>
              <b>{{ h.translate('label') }} :</b> &nbsp;
              {{ data.label }}
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

      <DisplaysMetaInfoViewTable :data="data" />
    </n-space>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound } from '@vicons/material'
  import { useLanguagesStore } from '~/stores/useLanguagesStore'
  import { useSettingStore } from '~/stores/useSettingsStore'
  import { useUserStore } from '~/stores/useUsersStore'

  const emit = defineEmits(['modalTitle'])
  const h = useHelpers()
  const { isMobile } = useDevice()

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