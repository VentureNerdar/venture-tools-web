<template>
  <n-spin :show="d.loading.page" size="large">
    <n-card size="small">
      <n-space vertical :size="10">
        <n-flex justify="end" style="width: 100%">
          <n-space>
            <div v-if="d.visibility.trash">
              <n-text type="error" strong> Viewing Trash </n-text>
            </div>

            <!-- QUICK FILTER -->
            <div v-if="p.module.options.filter !== false">
              <n-tooltip>
                <template #trigger>
                  <n-icon>
                    <FilterAltRound />
                  </n-icon>
                </template>

                Quick Filter
              </n-tooltip>
              &nbsp;

              <n-radio-group
                v-model:value="d.selectedFilterOption"
                name="filterOptionsGroup"
                default-value="all"
                @update:value="m.handle.changed.quickFilter"
                size="small"
              >
                <n-radio-button :key="'all'" :value="'all'" :label="'All'" />

                <n-radio-button
                  v-for="filter in p.module.options.filter.values"
                  :key="filter.value"
                  :value="filter.value"
                  :label="filter.label"
                />
              </n-radio-group>
            </div>
            <!-- e.o. QUICK FILTER -->

            <!-- CLEAR FILTER-->
            <div v-if="isFiltered">
              <n-button
                type="error"
                size="small"
                @click="m.handle.click.clearFilterButton()"
              >
                <template #icon>
                  <n-icon>
                    <FilterAltOffRound />
                  </n-icon>
                </template>
              </n-button>
            </div>

            <!-- VIEW TRASH TOGGLE -->
            <div v-if="p.module.hasSoftDelete">
              <DisplaysTrash
                @trash-view-toggled="m.handle.emits.trashViewToggled"
              />
            </div>
            <!-- e.o VIEW TRASH TOGGLE -->

            <!-- SERACH -->
            <n-input
              :placeholder="`Search in ${p.module.name.toLowerCase()} by ${p.searchByFieldName}...`"
              size="small"
              v-model:value="d.searchKeyword"
              :clearable="true"
              @keydown="m.handle.keydown.search"
              @change="m.handle.cleared.search"
            />
            <!-- e.o SEARCH -->

            <!-- CREATE TRIGGER BUTTON -->
            <n-button
              type="success"
              size="small"
              @click="m.handle.click.createButton"
            >
              <template #icon>
                <component
                  :is="
                    p.formModalOptions.components.buttonIconComponent
                      ? p.formModalOptions.components.buttonIconComponent
                      : PlusRound
                  "
                />
              </template>
            </n-button>
            <!-- e.o CREATE TRIGGER BUTTON-->
          </n-space>
        </n-flex>

        <!-- DATA TABLE -->
        <n-data-table
          ref="table"
          :columns="dataColumns"
          :data="d.data"
          :pagination="false"
          :bordered="true"
          empty="asdfasdf"
          max-height="calc(100vh - 304px)"
          size="small"
          @update:sorter="m.handle.changed.sort"
          @update:filters="m.handle.changed.filter"
        >
          <template #empty>
            <n-space vertical :size="10" style="text-align: center">
              <n-icon :size="40">
                <n-text :depth="3">
                  <InboxRound />
                </n-text>
              </n-icon>

              <n-text :depth="3">
                No {{ d.visibility.trash ? "trashed" : "" }}
                {{ p.module.name }} found.
              </n-text>
            </n-space>
          </template>
        </n-data-table>
        <!-- e.o. DATA TABLE -->

        <!-- PAGINATION -->
        <n-pagination
          v-if="p.getAll === false"
          v-model:page="d.page"
          v-model:page-size="d.pageSize"
          :page-count="d.pageCount"
          show-size-picker
          :page-sizes="[5, 10, 20, 50, 100]"
          @update:page="m.handle.changed.pageNumber"
          @update:page-size="m.handle.changed.pageSize"
        >
          <template #suffix=""> Total : {{ d.totalItems }} </template>
        </n-pagination>
        <!-- e.o. PAGINATION -->
      </n-space>
    </n-card>

    <!-- FORM MODAL -->
    <ModalsGenericSaveForm
      :show-modal="d.showModal"
      :form-modal-options="p.formModalOptions"
      :form="d.modalForm"
      :store-options="p.storeOptions"
      :route-path="p.module.routePath"
      @close-modal="m.handle.emits.closeModal"
    />
    <!-- e.o FORM MODAL -->

    <template #description> Fetching {{ p.module.name }}... </template>
  </n-spin>
</template>

<script lang="ts" setup>
// TODO:
/*
    [x] : display table
    [x] : pagination
    [x] : create / edit ( save )
    [x] : search
    [x] : quick filter
    [x] : soft delete
    [x] : hard delete
    [x] : sort
    [x] : advanced filter
    [x] : clear advanced filter
    [x] : view soft deletes
    [x] : restore soft deletes
    [x] : view
    [ ] : export
    [ ] : select & bulk actions
  */

import {
  NButton,
  NIcon,
  NSpace,
  NDataTable,
  type DataTableInst,
} from "naive-ui"
import type {
  StoreOptions,
  FormModalOptions,
  BrowseCondition,
  FormModel,
  ModalWidthSize,
} from "~/types"
import {
  FilterAltRound,
  PlusRound,
  FilterAltOffRound,
  DeleteForeverRound,
  InboxRound,
} from "@vicons/material"
import GenericDelete from "../Modals/GenericDelete.vue"
import GenericRestore from "../Modals/GenericRestore.vue"
import GenericEdit from "../Modals/GenericEdit.vue"
import type { Module } from "~/utils/modules"
import GenericView from "../Modals/GenericView.vue"

const tableRef = ref<DataTableInst | null>(null)
const table = tableRef

const p = withDefaults(
  defineProps<{
    module: Module
    storeOptions: StoreOptions
    formModalOptions: FormModalOptions
    searchByFieldName: string
    browseOptions?: false | BrowseCondition
    getAll: boolean
  }>(),
  {
    browseOptions: false,
    getAll: false,
  },
) // e.o p

const d = reactive({
  modalForm: false as false | FormModel,
  showModal: false,
  selectedFilterOption: ref(null),
  selectedSoftDeletesOption: ref(null),
  visibility: {
    trash: false,
  },
  data: [],
  page: 1,
  pageSize: 5,
  pageCount: 100,
  totalItems: 0,
  loading: {
    page: false,
  }, // e.o loading
  searchKeyword: "",
  filteredOptions: [] as {
    key: string
    value: number[] | boolean[] | string[]
  }[],

  browseQuery: {
    page: 1,
    per_page: 5,
  } as BrowseCondition,

  defaultBrowseQuery: {
    page: 1,
    per_page: 5,
  }, // e.o defaultBrowseQuery
}) // e.o d

const u = {
  consume: useConsumeApi(p.module.routePath),
} // e.o u

const m = {
  getData: async (browseQuery: BrowseCondition) => {
    d.loading.page = true

    const bq = { ...browseQuery } as BrowseCondition

    if (p.getAll) {
      delete (bq as any).page
      delete (bq as any).per_page
      ;(bq as any).all = true
    }

    const response = await u.consume.browse(bq, p.storeOptions)

    d.loading.page = false

    if (!p.getAll) {
      if (response.data && typeof response.data === "object") {
        if (!p.getAll) {
          const res = response as { data: any; total?: number }
          d.data = res.data

          if (res.total !== undefined) {
            d.totalItems = res.total
            d.pageCount = Math.ceil(res.total / d.pageSize)
          }
        } else {
          console.log(response)
        }
      }
    } else {
      d.data = response
    }

    console.log(d.data)
  }, // e.o getData

  browse: async () => {
    await m.getData(d.browseQuery)
  },

  handle: {
    click: {
      createButton: () => {
        d.modalForm = false
        d.showModal = true
      },

      editButton: (row: any) => {
        d.modalForm = { ...row }
        console.log(d.modalForm)

        if (p.formModalOptions.hiddenFieldsOnEdit) {
          p.formModalOptions.hiddenFieldsOnEdit.forEach((element) => {
            if (d.modalForm && typeof d.modalForm === "object") {
              delete (d.modalForm as Record<string, any>)[element]
            }
          })
        }

        // deleting timestamps . let the backend update it .
        if (d.modalForm) {
          if ("created_at" in d.modalForm) {
            delete (d.modalForm as Record<string, any>)["created_at"]
          }

          if ("updated_at" in d.modalForm) {
            delete (d.modalForm as Record<string, any>)["updated_at"]
          }

          if ("deleted_at" in d.modalForm) {
            delete (d.modalForm as Record<string, any>)["deleted_at"]
          }
        }

        d.showModal = true
      },

      deleteButton: (row: any) => {
        console.log(row)
      },

      clearFilterButton: () => {
        if (table !== null && "value" in table) {
          if (table.value) {
            d.filteredOptions = []
            table.value.clearFilters()
            m.handle.changed.filter([])
            m.browse()
          }
        }
      },
    },

    changed: {
      quickFilter: (value: string) => {
        if (p.module.options.filter !== false) {
          if (value === "all") {
            if ("all" in d.browseQuery === false) {
              d.browseQuery.page = d.defaultBrowseQuery.page
              delete d.browseQuery.search_by
              delete d.browseQuery.search
            }

            d.page = 1

            m.browse()
            return
          }

          d.browseQuery.search_by = p.module.options.filter.whereFieldIs
          d.browseQuery.search = value

          m.browse()
        }
      }, // e.o. quickFilter

      pageSize: (value: number) => {
        const browseQuery = {
          all: false,
          page: d.page,
          per_page: value,
        } as BrowseCondition

        if ("all" in d.browseQuery === false) {
          d.browseQuery.per_page = value
        }

        m.browse()
      }, // e.o. pageSize

      pageNumber: (value: number) => {
        if ("all" in d.browseQuery === false) {
          d.browseQuery.page = value
        }

        m.browse()
      },

      sort: (sort: any) => {
        console.log(sort)

        switch (sort.order) {
          case "ascend":
            Object.assign(d.browseQuery, {
              sort: [{ key: sort.columnKey, order: "asc" }],
            })
            break

          case "descend":
            Object.assign(d.browseQuery, {
              sort: [{ key: sort.columnKey, order: "desc" }],
            })
            break

          default:
            delete d.browseQuery.sort
            break
        }

        m.browse()
      }, // e.o sort

      filter: (filter: any) => {
        const filterClone = JSON.parse(JSON.stringify(filter))

        Object.entries(filterClone).forEach(([key, value]) => {
          const existingEntry = d.filteredOptions.find(
            (entry) => entry.key === key,
          )

          if (Array.isArray(value) && value.length > 0) {
            if (existingEntry) {
              existingEntry.value = value
            } else {
              d.filteredOptions.push({ key: key, value: value as string[] })
            }
          } else {
            d.filteredOptions = d.filteredOptions.filter(
              (entry) => entry.key !== key,
            )
          }
        })

        const whereIn = JSON.parse(JSON.stringify(d.filteredOptions))

        if (whereIn.length > 0) {
          d.browseQuery.whereIn = whereIn
        } else {
          delete d.browseQuery.whereIn
        }

        m.browse()
      }, // e.o filter
    }, // e.o changed

    keydown: {
      search: (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          const searchBrowseQuery = {
            ...d.defaultBrowseQuery,
            search_by: p.searchByFieldName,
            search: d.searchKeyword,
          } as BrowseCondition

          m.getData(searchBrowseQuery)
        }
      }, // e.o search
    }, // e.o keydown

    cleared: {
      search: () => {
        if (d.searchKeyword === "") {
          m.getData(d.defaultBrowseQuery)
        }
      },
    }, // e.o cleared

    emits: {
      closeModal: (refresh: boolean) => {
        if (refresh) {
          m.getData(d.defaultBrowseQuery)
        }

        d.showModal = false
      },

      deleteProgress: (successStatus: boolean) => {
        if (successStatus) {
          m.getData(d.browseQuery)
        }
      },

      trashViewToggled: (toggled: boolean) => {
        d.visibility.trash = toggled
        d.browseQuery.onlyTrashed = toggled || undefined
        m.browse()
      },
    },
  }, // e.o handle
} // e.o m

const dataColumns = computed(() => {
  const columns = [...p.module.dataTable.columns]

  columns.push({
    key: "actions",
    width: "160px",
    align: "center",
    render(row: any) {
      const buttons = [] as any[]

      buttons.push(
        h(GenericView, {
          id: row.id,
          data: row,
          viewComponent: p.module.view?.component,
          width: p.module.view?.modalWidthSize as ModalWidthSize,
          onEditButtonClicked: () => {
            m.handle.click.editButton(row)
          },
        }),
      )

      if (!d.visibility.trash) {
        buttons.push(
          h(GenericEdit, {
            onEditClick: () => {
              m.handle.click.editButton(row)
            },
          }),
        )
      }

      if (d.visibility.trash) {
        buttons.push(
          h(GenericRestore, {
            model: p.module.routePath,
            id: row.id,
            onRestoreProgress: (successStatus: boolean) => {
              m.handle.emits.deleteProgress(successStatus)
            },
          }),
        )
      }

      buttons.push(
        h(GenericDelete, {
          permanent: p.module.hasSoftDelete
            ? d.visibility.trash
              ? true
              : false
            : true,
          model: p.module.routePath,
          id: row.id,
          onDeleteProgress: (successStatus: boolean) => {
            m.handle.emits.deleteProgress(successStatus)
          },
        }),
      )

      return [
        h(
          NSpace,
          {
            size: 10,
            justify: "center",
          },
          {
            default: () => buttons,
          },
        ),
      ]
    },
  })

  return columns
})

const isFiltered = computed(() => {
  return d.filteredOptions.length > 0 ? true : false
})

if (p.browseOptions !== false) {
  d.defaultBrowseQuery = JSON.parse(
    JSON.stringify({
      ...d.defaultBrowseQuery,
      ...JSON.parse(JSON.stringify(p.browseOptions)),
    }),
  )
}

m.getData(d.defaultBrowseQuery)
</script>

<style></style>
