<template>
  <div>
    <n-space :size="10" vertical>
      <n-alert v-if="data.deleted_at !== null" type="error">
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
        This contact is in trash.
      </n-alert>

      <table class="table">
        <tbody>
          <tr>
            <td colspan="2">
              <b>{{ translatedWord('name') }} :</b> &nbsp;
              <span class="uppercase">{{ data.name }}</span>
              <br />
              <b>{{ translatedWord('username') }} : </b> &nbsp; {{ data.nickname }}
            </td>

            <td style="width: 20%">
              <b>{{ translatedWord('contact_status') }} :</b> &nbsp;
              <n-tag :border="false" type="info">
                {{ m.contactStatus(data.contact_status_id as number) }}</n-tag
              >
            </td>

            <td style="width: 20%">
              <b>{{ translatedWord('faith_status') }} :</b> &nbsp;
              <n-tag :border="false" type="info">
                {{ m.faithStatus(data.faith_status_id as number) }}
              </n-tag>
            </td>
          </tr>

          <tr>
            <td style="width: 20%">
              <b>{{ translatedWord('gender') }} : </b> &nbsp;
              <span class="uppercase">{{ data.gender }}</span>
            </td>

            <td style="width: 20%">
              <b>{{ translatedWord('age') }} : </b> &nbsp;
              <span class="uppercase"> {{ data.age }}</span>
            </td>

            <td>
              <b>{{ translatedWord('assigned_to') }} :</b> &nbsp;
              <span class="uppercase">{{
                m.render.assignedTo(data.assigned_to)
              }}</span>
            </td>

            <td>
              <b>{{ translatedWord('coached_by') }} :</b> &nbsp;
              <span>{{ m.render.coachedBy(data.coached_by) }}</span>
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <div style="margin-bottom: 10px">
                <b>{{ translatedWord('people_group') }} </b>
              </div>

              <n-space :size="10" v-if="dataPeopleGroups">
                <n-tag v-for="pg in dataPeopleGroups" type="default">
                  {{ "name" in pg ? (pg as any).name : "N/A" }}
                </n-tag>
              </n-space>
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <div style="margin-bottom: 10px"><b>{{ translatedWord('faith_milestones') }}</b></div>

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
                <div><b>{{ translatedWord('current_prayers') }}</b></div>

                <div>
                  {{ data.current_prayers }}
                </div>
              </n-space>
            </td>
          </tr>
        </tbody>
      </table>

      <n-table :bordered="true" :single-line="false">
        <tbody>
          <tr>
            <td>
              <b>{{ translatedWord('created_at') }}</b> &nbsp;
              <n-text tag="div" code>{{
                useHelpers().formatDate(
                  data.created_at ? data.created_at : "N/A",
                )
              }}</n-text>
            </td>
            <td>
              <b>{{ translatedWord('updated_at') }}</b> &nbsp;
              <n-text tag="div" code>{{
                useHelpers().formatDate(
                  data.updated_at ? data.updated_at : "N/A",
                )
              }}</n-text>
            </td>
            <td>
              <b>{{ translatedWord('deleted_at') }}</b> &nbsp;
              <n-text tag="div" code>{{
                useHelpers().formatDate(
                  data.deleted_at ? data.deleted_at : "N/A",
                )
              }}</n-text>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { DeleteRound } from "@vicons/material"
import { useFaithMilestoneStore } from "~/stores/useFaithMilestonesStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { useSettingStore } from "~/stores/useSettingsStore"
import { useUserStore } from "~/stores/useUsersStore"

import type { ContactFormModel, PeopleGroupFormModel } from "~/types"
import { RoutePaths } from "~/types/index.d"

const emit = defineEmits(["modalTitle"])



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

const helpers = useHelpers();
const usrPreferLang = s.settings.currentPreferredLanguage
const words = s.systemLanguages.words
const translatedWord = (key: string) => {
  return helpers.getTranslatedWord(usrPreferLang.value.translations, words, key);
};

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
    const status = s.settings.options.contact.find(
      (c: any) => c.value === contactStatusID,
    )
    return status ? status.label : "N/A"
  },

  faithStatus: (faithStatusID: number) => {
    const status = s.settings.options.faith.find(
      (f: any) => f.value === faithStatusID,
    )
    return status ? status.label : "N/A"
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

<style scoped lang="scss">
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
