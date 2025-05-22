<template>
  <div>
    <n-space
      :size="10"
      vertical
    >
      <!-- <h2>{{ h.translate('church.need_to_change') }}</h2> -->

      <n-alert
        v-if="data.deleted_at !== null"
        type="error"
      >
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
        {{h.translate('this_denomination_is_in_trash')}}
      </n-alert>

      <n-table :single-line="false">
        <tbody>
          <tr>
            <td colspan="4">
              <b>{{ h.translate('name') }}:</b> &nbsp; {{ data.name }}
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <div><b>{{ h.translate('description') }}</b></div>
              <p>{{ data.description ? data.description : 'N/A' }}</p>
            </td>
          </tr>

          <tr>
            <td> 
              <b>{{ h.translate('parent_church') }}</b>  &nbsp;
              <p>{{ data.parent_church ? data.parent_church.name : 'N/A' }}</p>
            </td>

            <!-- <td>
              <div><b>{{ h.translate('church_website') }}</b></div>
              <p>{{ data.website ? data.website : 'N/A' }}</p>
            </td> -->

            <td colspan="2">
              <b>{{ h.translate('founded_at') }}</b>
              <p>{{ data.founded_at ? data.founded_at : 'N/A' }}</p>
            </td>
          </tr>

          <tr >
            <td>
              <b>{{ h.translate('denomination') }}</b>  &nbsp;
              <p>{{ data.denomination ? data.denomination.name : 'N/A' }}</p>
            </td>

            <!-- <td>
              <div><b>{{ h.translate('church_phone_number') }}</b></div>
              <p>{{ data.phone_number ? data.phone_number : 'N/A' }}</p>
            </td> -->

            <td colspan="2">
              <div style="margin-bottom: 5px"><b>{{ h.translate('is_active') }}</b></div>
              <!-- <p>{{ data.is_active ? 'Yes' : 'No' }}</p> -->
               <n-tag :type="data.is_active ? 'success' : 'error'">
                {{ data.is_active ? 'Active' : 'Inactive' }}
               </n-tag>
            </td>
          </tr>

          <tr>
            <td>
              <p>{{ h.translate('church_members_count') }} : 
                <span style="padding-left: 5px;">{{ data.church_members_count ? data.church_members_count : '0'}}</span>
              </p>
            </td>

            <td>
              <p>{{ h.translate('confession_of_faith_count') }} : 
                <span style="padding-left: 5px;">{{ data.confession_of_faith_count ? data.confession_of_faith_count : '0'}}</span>
              </p>
            </td>

            <td>
              <p>{{ h.translate('baptized_count') }} : 
                <span style="padding-left: 5px;">{{ data.baptism_count ? data.baptism_count : '0'}}</span>
              </p>
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