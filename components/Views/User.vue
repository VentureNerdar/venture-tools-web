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
        {{ h.translate('this_user_is_in_trash') }}
      </n-alert>

      <div v-if="!isMobile">
        <n-table :single-line="false">
          <tbody>
            <tr>
              <td>
                <b>{{ h.translate('name') }} :</b> &nbsp;
                <n-text type="info">
                  <b>{{ data.name }} </b> &nbsp;
                  <n-tag
                    size="tiny"
                    :bordered="false"
                    :type="data.is_active ? 'success' : 'default'"
                  >
                    {{ data.is_active ? h.translate('active_up') : h.translate('inactive_up') }}
                  </n-tag>
                </n-text>
                <div class="wrap-info">
                  <n-text depth="3">
                    @{{ data.username }}
                  </n-text>
                </div>
              </td>
              <td>
                <n-text type="info">
                  {{ m.userRole(data.user_role_id) }}
                </n-text>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('email') }} :</b> {{ data.email ? data.email : 'N/A' }}</div>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('phone') }} :</b> {{ data.phone_number ? data.phone_number : 'N/A' }}</div>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('biography') }}</b></div>
                <p>{{ data.biography === '' ? 'N/A' : data.biography }}</p>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('language_preference') }}:</b> {{
                  m.languagePreference(data.preferred_language_id)
                }}
                </div>
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
                <b>{{ h.translate('created_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.created_at }}</n-text>
              </td>
              <td>
                <b>{{ h.translate('updated_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.updated_at }}</n-text>
              </td>
              <td>
                <b>{{ h.translate('deleted_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.deleted_at ? data.deleted_at : 'N/A' }}</n-text>
              </td>
              <td>
                <b>{{ h.translate('created_at') }}</b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.last_login_at ? data.last_login_at : 'N/A' }}</n-text>
              </td>
            </tr>
          </tbody>

        </n-table>
      </div>

      <div v-else>
        <n-table :single-line="false">
          <tbody>
            <tr>
              <td>
                <b>{{ h.translate('name') }} :</b> &nbsp;
                <n-text type="info">
                  <b>{{ data.name }} </b> &nbsp;
                  <n-tag
                    size="tiny"
                    :bordered="false"
                    :type="data.is_active ? 'success' : 'default'"
                  >
                    {{ data.is_active ? h.translate('active_up') : h.translate('inactive_up') }}
                  </n-tag>
                </n-text>
                <div class="wrap-info">
                  <n-text depth="3">
                    @{{ data.username }}
                  </n-text>
                </div>
              </td>

            </tr>
            <tr>
              <td>
                <n-text type="info">
                  {{ m.userRole(data.user_role_id) }}
                </n-text>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('email') }} :</b> {{ data.email ? data.email : 'N/A' }}</div>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('phone') }} :</b> {{ data.phone_number ? data.phone_number : 'N/A' }}</div>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('biography') }}</b></div>
                <p>{{ data.biography === '' ? 'N/A' : data.biography }}</p>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <div><b>{{ h.translate('language_preference') }}:</b> {{
                  m.languagePreference(data.preferred_language_id)
                }}
                </div>
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
                <b>{{ h.translate('created_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.created_at }}</n-text>
              </td>
            </tr>

            <tr>
              <td>
                <b>{{ h.translate('updated_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.updated_at }}</n-text>
              </td>
            </tr>

            <tr>
              <td>
                <b>{{ h.translate('deleted_at') }} </b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.deleted_at ? data.deleted_at : 'N/A' }}</n-text>
              </td>
            </tr>

            <tr>
              <td>
                <b>{{ h.translate('created_at') }}</b> &nbsp;
                <n-text
                  tag="div"
                  code
                >{{ data.last_login_at ? data.last_login_at : 'N/A' }}</n-text>
              </td>
            </tr>
          </tbody>

        </n-table>
      </div>
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