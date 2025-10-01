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
        {{ h.translate('this_contact_is_in_trash') }}
      </n-alert>

      <table
        v-if="!isMobile"
        class="table"
      >
        <tbody>
          <tr>
            <td colspan="2">
              <b>{{ h.translate('name') }} :</b> &nbsp;
              <span class="uppercase">{{ data.name }}</span>
              <br />
              <b>{{ h.translate('username') }} : </b> &nbsp; {{ data.nickname }}
            </td>

            <td style="width: 20%">
              <b>{{ h.translate('contact_status') }} :</b> &nbsp;
              <n-tag
                :border="false"
                type="info"
              >
                {{ m.contactStatus(data.contact_status_id as number) }}</n-tag>
            </td>

            <td style="width: 20%">
              <b>{{ h.translate('faith_status') }} :</b> &nbsp;
              <n-tag
                :border="false"
                type="info"
              >
                {{ m.faithStatus(data.faith_status_id as number) }}
              </n-tag>
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ h.translate('gender') }} : </b> &nbsp;
              <span class="uppercase">{{ data.gender }}</span>
            </td>

            <td style="width: 20%">
              <b>{{ h.translate('age') }} : </b> &nbsp;
              <span class="uppercase"> {{ data.age }}</span>
            </td>

            <td>
              <b>{{ h.translate('assigned_to') }} :</b> &nbsp;
              <span class="uppercase">{{
                m.render.assignedTo(data.assigned_to)
              }}</span>
            </td>

            <td>
              <b>{{ h.translate('coached_by') }} :</b> &nbsp;
              <span>{{ m.render.coachedBy(data.coached_by) }}</span>
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <div style="margin-bottom: 10px">
                <b>{{ h.translate('people_group') }} </b>
              </div>

              <n-space
                :size="10"
                v-if="dataPeopleGroups"
              >
                <n-tag
                  v-for="pg in dataPeopleGroups"
                  type="default"
                >
                  {{ "name" in pg ? (pg as any).name : "N/A" }}
                </n-tag>
              </n-space>
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <div style="margin-bottom: 10px"><b>{{ h.translate('faith_milestones') }}</b></div>

              <n-space :size="10">
                <div
                  v-for="fm in d.faithMilestones"
                  :key="fm.id"
                  :class="`wrap-faith-milestones ${m.handle.hasFaithMilestone(fm.id) ? '' : 'not-included'}`"
                >
                  <n-image
                    width="20"
                    lazy
                    :src="useRuntimeConfig().public.rootURL + fm.icon"
                    style="margin-right: 10px"
                  />

                  {{ fm.name }}
                </div>
              </n-space>
            </td>
          </tr>

          <tr style="height: 100%">
            <td colspan="4">
              <n-space vertical>
                <div><b>{{ h.translate('current_prayers') }}</b></div>

                <div>
                  {{ data.current_prayers }}
                </div>
              </n-space>
            </td>
          </tr>
        </tbody>
      </table>

      <table
        v-else
        class="table"
      >
        <tbody>
          <tr>
            <td colspan="2">
              <b>{{ h.translate('name') }} :</b> &nbsp;
              <span class="uppercase">{{ data.name }}</span>
              <br />
              <b>{{ h.translate('username') }} : </b> &nbsp; {{ data.nickname }}
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ h.translate('contact_status') }} :</b> &nbsp;
              <n-tag
                :border="false"
                type="info"
              >
                {{ m.contactStatus(data.contact_status_id as number) }}</n-tag>
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ h.translate('faith_status') }} :</b> &nbsp;
              <n-tag
                :border="false"
                type="info"
              >
                {{ m.faithStatus(data.faith_status_id as number) }}
              </n-tag>
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ h.translate('gender') }} : </b> &nbsp;
              <span class="uppercase">{{ data.gender }}</span>
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ h.translate('age') }} : </b> &nbsp;
              <span class="uppercase"> {{ data.age }}</span>
            </td>
          </tr>

          <tr>
            <td>
              <b>{{ h.translate('assigned_to') }} :</b> &nbsp;
              <span class="uppercase">{{
                m.render.assignedTo(data.assigned_to)
              }}</span>
            </td>

          </tr>

          <tr>
            <td>
              <b>{{ h.translate('coached_by') }} :</b> &nbsp;
              <span>{{ m.render.coachedBy(data.coached_by) }}</span>
            </td>
          </tr>

          <tr>
            <td>
              <div style="margin-bottom: 10px">
                <b>{{ h.translate('people_group') }} </b>
              </div>
              <n-space
                :size="10"
                v-if="dataPeopleGroups"
              >
                <n-tag
                  v-for="pg in dataPeopleGroups"
                  type="default"
                >
                  {{ "name" in pg ? (pg as any).name : "N/A" }}
                </n-tag>
              </n-space>
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <div style="margin-bottom: 10px"><b>{{ h.translate('faith_milestones') }}</b></div>

              <div>
                <div
                  v-for="fm in d.faithMilestones"
                  :key="fm.id"
                  :class="`wrap-faith-milestones ${m.handle.hasFaithMilestone(fm.id) ? '' : 'not-included'}`"
                  style="display: block !important; margin-bottom: 10px;"
                >
                  <n-image
                    width="20"
                    lazy
                    :src="useRuntimeConfig().public.rootURL + fm.icon"
                    style="margin-right: 10px"
                  />

                  {{ fm.name }}
                </div>
              </div>
            </td>
          </tr>

          <tr style="height: 100%">
            <td colspan="4">
              <n-space vertical>
                <div><b>{{ h.translate('current_prayers') }}</b></div>

                <div>
                  {{ data.current_prayers }}
                </div>
              </n-space>
            </td>
          </tr>
        </tbody>
      </table>

      <DisplaysMetaInfoViewTable :data="data" />

    </n-space>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import { DeleteRound } from "@vicons/material"
  import { useFaithMilestoneStore } from "~/stores/useFaithMilestonesStore"
  import { useLanguagesStore } from "~/stores/useLanguagesStore"
  import { useSettingStore } from "~/stores/useSettingsStore"
  import { useUserStore } from "~/stores/useUsersStore"

  import type { ContactFormModel, PeopleGroupFormModel } from "~/types"
  import { RoutePaths } from "~/types/index.d"

  const emit = defineEmits(["modalTitle"])
  const { isMobile } = useDevice()

  const p = withDefaults(
    defineProps<{
      id: number
      data: ContactFormModel
    }>(),
    {},
  )

  const consume = {
    faithMilestone: useConsumeApi(RoutePaths.FAITH_MILESTONES),
  }

  const s = {
    userRole: useUserStore(),
    systemLanguages: useLanguagesStore(),
    settings: useSettingStore(),
    faithMilestones: useFaithMilestoneStore(),
  }

  const h = useHelpers()

  const d = reactive({
    faithMilestones: [] as any[],
  })

  const m = {
    userRole: (roleID: number) => {
      const role = s.userRole.userRoles.find((role: any) => role.id === roleID)
      return role ? role.name.toUpperCase() : "N/A"
    },

    languagePreference: (languageID: number) => {
      const language = s.systemLanguages.languages.find(
        (lang: any) => lang.id === languageID,
      )
      return language ? language.name : "N/A"
    },

    contactStatus: (contactStatusID: number) => {
      let status = s.settings.options.contact.find(
        (c: any) => c.value === contactStatusID,
      )
      return status ? h.translate(h.toSnakeCase(status.label)) : "N/A"
    },

    faithStatus: (faithStatusID: number) => {
      const status = s.settings.options.faith.find(
        (f: any) => f.value === faithStatusID,
      )
      // return status ? h.translate(h.toSnakeCase(status.label)) : "N/A"

      return status ? h.translate(h.toSnakeCase(status.label)) : "N/A"
    },

    handle: {
      hasFaithMilestone: (fmid: number) => {
        return p.data.faith_milestones?.some((d: any) => d.id === fmid)
          ? "hi"
          : ""
      },
    },

    render: {
      assignedTo: (at: any) => {
        return at?.name
      },

      coachedBy: (cb: any) => {
        return cb !== null ? cb.name : "N/A"
      },
    },

    consume: {
      faithMilestone: async () => {
        d.faithMilestones = await consume.faithMilestone.browse(
          { all: true },
          {
            isPersist: true,
            key: "faithMilestones",
            storeState: s.faithMilestones.faithMilestones,
          },
        )
      },
    },
  }

  const dataPeopleGroups = computed(() => {
    return p.data.people_group
      ? (JSON.parse(JSON.stringify(p.data.people_group)) as PeopleGroupFormModel)
      : []
  })

  emit("modalTitle", p.data.name)

  m.consume.faithMilestone()
</script>

<style
  scoped
  lang="scss"
>
  .wrap-info {
    margin-top: 10px;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .wrap-faith-milestones {
    border: 1px solid rgba(204, 204, 204, 0.1);
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: calc(100% - 20px);

    &.not-included {
      filter: grayscale(100%);
      opacity: 0.4;
    }
  }

  .table {
    width: 100%;
    border: 1px solid rgba(204, 204, 204, 0.1);
    border-collapse: collapse;

    tr {
      td {
        padding: 10px;
        border: 1px solid rgba(204, 204, 204, 0.1);
      }
    }
  }
</style>