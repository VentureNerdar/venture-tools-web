<template>
  <div>
    <n-space :size="10" vertical>
      <n-alert v-if="data.deleted_at !== null" type="error">
        <template #icon>
          <n-icon>
            <DeleteRound />
          </n-icon>
        </template>
        {{ h.translate('this_community_is_in_trash') }}

      </n-alert>

      <n-table :single-line="false" class="topaligned">
        <tbody>
          <tr>
            <td style="width: 50%"><b>{{ h.translate('name') }}:</b> &nbsp; {{ data.name }}</td>
            <td colspan="2">
              <b>{{ h.translate('longitude') }} : </b> {{ data.location_longitude }}
              &nbsp;&nbsp;
              <b>{{ h.translate('latitude') }} : </b> {{ data.location_latitude }}
            </td>
          </tr>

          <tr>
            <td>
              <n-space :size="10" vertical>
                <div class="center-vertically">
                  <n-icon
                    size="20"
                    :component="CheckBoxOutlineBlankRound"
                    v-if="!data.conducted_survey_of_community_needs"
                  />

                  <n-icon :component="CheckBoxRound" v-else size="20" />

                  <span> &nbsp; {{ h.translate('conducted_survey_of_community_needs') }} </span>
                </div>

                <n-list>
                  <n-list-item>
                    <div><b>{{ h.translate('community_needs') }} 1</b></div>
                    {{
                      data.community_needs_1 === null
                        ? "N/A"
                        : data.community_needs_1
                    }}
                  </n-list-item>
                  <n-list-item>
                    <div><b>{{ h.translate('community_needs') }} 2</b></div>
                    {{
                      data.community_needs_2 === null
                        ? "N/A"
                        : data.community_needs_2
                    }}
                  </n-list-item>
                  <n-list-item>
                    <div><b>{{ h.translate('community_needs') }} 3</b></div>
                    {{
                      data.community_needs_3 === null
                        ? "N/A"
                        : data.community_needs_3
                    }}
                  </n-list-item>
                  <n-list-item>
                    <div><b>{{ h.translate('community_needs') }} 4</b></div>
                    {{
                      data.community_needs_4 === null
                        ? "N/A"
                        : data.community_needs_4
                    }}
                  </n-list-item>
                  <n-list-item>
                    <div><b>{{ h.translate('community_needs') }} 5</b></div>
                    {{
                      data.community_needs_5 === null
                        ? "N/A"
                        : data.community_needs_5
                    }}
                  </n-list-item>
                </n-list>
              </n-space>
            </td>

            <td>
              <n-list>
                <template #header>
                  <b> {{ h.translate('person_of_peace') }} </b>
                </template>

                <n-list-item
                  v-if="data.peace_persons.length > 0"
                  v-for="pp in data.peace_persons"
                >
                  <div>
                    <b>{{ pp.name }}</b>
                  </div>

                  <div>
                    <n-text :depth="3" class="center-vertically">
                      <n-icon :component="EmailRound" /> &nbsp;
                      {{ pp.email }}
                    </n-text>

                    <n-text :depth="3" class="center-vertically">
                      <n-icon :component="LocalPhoneRound" /> &nbsp;
                      {{ pp.phone }}
                    </n-text>
                  </div>
                </n-list-item>

                <n-list-item v-else>
                  <n-empty :description="h.translate('no_person_of_peace')">
                    <template #icon>
                      <n-icon>
                        <NoAccountsRound />
                      </n-icon>
                    </template>
                  </n-empty>
                </n-list-item>
              </n-list>
            </td>

            <td>
              <n-list>
                <template #header>
                  <b> {{ h.translate('community_committees') }} </b>
                </template>
                <n-list-item
                  v-if="data.committees.length > 0"
                  v-for="pp in data.committees"
                >
                  <div>
                    {{ pp.name }}
                  </div>
                </n-list-item>

                <n-list-item v-else>
                  <n-empty :description="h.translate('no_community_committees')">
                    <template #icon>
                      <n-icon>
                        <GroupOffRound />
                      </n-icon>
                    </template>
                  </n-empty>
                </n-list-item>
              </n-list>
            </td>
          </tr>

          <tr>
            <td>
              <n-space :size="10" vertical>
                <div><b>{{ h.translate('community_checklists') }}</b></div>

                <n-grid :x-gap="10" :y-gap="10" cols="1">
                  <n-gi v-for="chk in s.community.communityChecklists">
                    <n-text :depth="m.checkChecklistIncluded(chk.id) ? 1 : 3">
                      <div class="center-vertically">
                        <n-icon
                          :component="
                            m.checkChecklistIncluded(chk.id)
                              ? CheckBoxRound
                              : CheckBoxOutlineBlankRound
                          "
                        />

                        &nbsp;

                        {{ chk.name }}
                      </div>
                    </n-text>
                  </n-gi>
                </n-grid>
              </n-space>
            </td>

            <td></td>
          </tr>
        </tbody>
      </n-table>

      <n-table :bordered="true" :single-line="false">
        <tbody>
          <tr>
            <td>
              <b>{{ h.translate('created_at') }}</b> &nbsp;
              <n-text tag="div" code>{{ data.created_at }}</n-text>
            </td>
            <td>
              <b>{{ h.translate('updated_at') }}</b> &nbsp;
              <n-text tag="div" code>{{ data.updated_at }}</n-text>
            </td>
            <td>
              <b>{{ h.translate('deleted_at') }}</b> &nbsp;
              <n-text tag="div" code>{{
                data.deleted_at ? data.deleted_at : "N/A"
              }}</n-text>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import {
  DeleteRound,
  CheckBoxOutlineBlankRound,
  CheckBoxRound,
  EmailRound,
  LocalPhoneRound,
  NoAccountsRound,
  GroupOffRound,
} from "@vicons/material"
import { useCommunityStore } from "~/stores/useCommunitiesStore"

const emit = defineEmits(["modalTitle"])

const h = useHelpers();

const s = {
  community: useCommunityStore(),
}

const p = withDefaults(
  defineProps<{
    id: number
    data: any
  }>(),
  {},
)

const m = {
  checkChecklistIncluded: (id: number) => {
    const gg = p.data.checklists.some((c: any) => c.id === id)
    console.log(gg)

    return gg
  },
}

emit("modalTitle", p.data.name)

console.log(s.community.communityChecklists)
</script>

<style scoped lang="scss">
.wrap-info {
  margin-top: 10px;
}

.center-vertically {
  display: flex;
  align-items: center;
}

.topaligned {
  tr {
    td {
      vertical-align: top;
    }
  }
}
</style>
