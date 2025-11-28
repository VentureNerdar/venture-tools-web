<template>
  <n-dialog-provider>
    <n-modal
      v-model:show="p.showDialog"
      @update:show="handleShowUpdate"
      preset="card"
      title="Select People Groups"
      style="width: 500px; max-height: 80vh;"
    >
      <n-input
        size="small"
        :placeholder="h.translate('search_people_group')"
        v-model:value="d.searchQuery"
        clearable
        @keypress.enter="m.handle.search.peopleGroups"
        @clear="m.handle.defaultPeopleGroupList"
      />
      <n-scrollbar
        style="max-height: calc(100vh - 250px)"
        :size="20"
        :x-scrollable="false"
        :show-scrollbar="true"
      >
        <n-space
          :size="5"
          vertical
        >
          <n-list hoverable>
            <n-list-item
              v-for="pg in d.peopleGroupList"
              :key="pg?.id"
            >
              <div style="display: flex;   justify-content: space-between;">
                <div>{{ pg.name ?? "" }}</div>
                <div>
                  <div v-if="!m.handle.isSelected(pg)">

                    <n-button
                      size="small"
                      type="primary"
                      secondary
                      @click="m.handle.click.addPeopleGroup(pg)"
                    >
                      <n-icon>
                        <PlusRound />
                      </n-icon>
                      <!-- Add -->
                    </n-button>
                  </div>
                  <div v-else>
                    <n-button
                      size="small"
                      type="error"
                      secondary
                      @click="m.handle.click.removePeopleGroup(pg)"
                    >
                      <n-icon>
                        <CloseRound />
                      </n-icon>
                    </n-button>
                  </div>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </n-space>
      </n-scrollbar>
    </n-modal>
  </n-dialog-provider>

</template>

<script lang="ts" setup>
import { PlusRound, CloseRound } from '@vicons/material'
import { RoutePaths, type BrowseConditionAll, type PeopleGroupFormModel } from '~/types/index.d'


const p = defineProps<{
  showDialog: boolean
  peopleGroupList: PeopleGroupFormModel[]
}>()

const emit = defineEmits<{
  // This tells parent: "please update your visibility flag"
  'update:showDialog': [value: boolean],
  'added-people-group': [pg: PeopleGroupFormModel],
  'removed-people-group': [pg: PeopleGroupFormModel]
}>()

const h = useHelpers()


const d = reactive({
  searchQuery: "",
  peopleGroupList: [] as PeopleGroupFormModel[],
  // selectedPeopleGroups: [] as PeopleGroupFormModel[]
})

const consume = {
  peopleGroups: useConsumeApi(RoutePaths.PEOPLE_GROUPS)
}

const m = {
  handle: {
    defaultPeopleGroupList: async () => {
      d.peopleGroupList = await consume.peopleGroups.browse({
        all: true,
        limit: 10,
      })
    },
    isSelected: (pg: PeopleGroupFormModel) => {
      // return d.selectedPeopleGroups.some(x => x.id === pg.id)
      return p.peopleGroupList.some(x => x.id === pg.id)
    },
    click: {
      addPeopleGroup: (pg: PeopleGroupFormModel) => {
        // if (!d.selectedPeopleGroups.includes(pg)) {
        //   console.log("Selected people group pg", pg)
        //   d.selectedPeopleGroups.push(pg)
        emit('added-people-group', pg)

        // }
      },
      removePeopleGroup: (pg: PeopleGroupFormModel) => {
        // if (m.handle.isSelected(pg)) {
        // const index = d.selectedPeopleGroups.findIndex(x => x.id === pg.id)
        // if (index !== -1) {
        //   d.selectedPeopleGroups.splice(index, 1)
        emit('removed-people-group', pg)
        // }

        // }
      }
    },
    search: {
      peopleGroups: async () => {
        const bc = {
          all: true,
          search: d.searchQuery,
          search_by: "name",
          limit: 20,
        } as BrowseConditionAll

        d.peopleGroupList = await consume.peopleGroups.browse(bc, false)
      }
    }
  }
}

onMounted(() => {
  // d.peopleGroupList = p.peopleGroupList
  console.log("on mounted D people group list", d.peopleGroupList)
})

const handleShowUpdate = (value: boolean) => {
  emit('update:showDialog', value)
}


function getPeopleGroupName(id: number) {
  return d.peopleGroupList.find((p: any) => p.id === id)?.name || ''
}

m.handle.defaultPeopleGroupList()

// watch(
//   () => p.peopleGroupList,
//   (newVal) => {
//     // d.peopleGroupList = newVal
//     // selectedPeopleGroups.value = []
//     // selectedPeopleGroups.value = newVal
//     newVal.forEach((val) => {
//       if (!d.selectedPeopleGroups.includes(val)) {
//         // selectedPeopleGroups.value.push(val)
//         d.selectedPeopleGroups = [...d.selectedPeopleGroups, val]

//       }



//     })

//     console.log("watcher  new val", newVal)
//   }
// )

</script>