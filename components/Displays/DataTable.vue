<template>
  <n-spin
    :show="d.loading.page"
    size="large"
  >
    <n-card size="small">
      <n-space
        vertical
        :size="10"
      >
        <n-flex
          justify="end"
          style="width: 100%"
        >
          <n-space>
            <div v-if="d.visibility.trash">
              <n-text
                type="error"
                strong
              >
                {{ helper.translate("viewing_archive") }}
              </n-text>
            </div>

            <!-- CLEAR FILTER-->
            <div v-if="isFiltered">
              <n-button
                type="error"
                size="small"
                @click="m.handle.click.clearfilterbutton()"
              >
                <template #icon>
                  <n-icon>
                    <filterAltOffRound />
                  </n-icon>
                </template>
              </n-button>
            </div>

            <!-- QUICK FILTER -->
            <div v-if="p.module.options.filter !== false">
              <div style="display: inline">
                <n-tooltip>
                  <template #trigger>
                    <n-icon>
                      <FilterAltRound />
                    </n-icon>
                  </template>

                  {{ helper.translate("quick_filter") }}
                </n-tooltip>
              </div>
              &nbsp;

              <n-radio-group
                v-if="d.filterType === 'single'"
                v-model:value="d.selectedFilterOption"
                name="filterOptionsGroup"
                default-value="all"
                @update:value="m.handle.changed.quickFilter"
                size="small"
              >
                <n-radio-button
                  :key="'all'"
                  :value="'all'"
                  :label="helper.translate('all')"
                />

                <n-radio-button
                  v-for="filter in translatedFilterValues"
                  :key="filter.value"
                  :value="filter.value"
                  :label="filter.label"
                />
              </n-radio-group>

              <n-input-group
                v-else
                style="display: inline"
              >
                <n-popover
                  trigger="click"
                  v-for="filter in translatedFilterValues"
                  placement="bottom"
                >
                  <template #trigger>
                    <n-button
                      :key="filter.value"
                      size="small"
                    >
                      {{ filter.name }}
                    </n-button>
                  </template>

                  <n-radio-group
                    v-model:value="d.selectedFilterOption"
                    size="small"
                  >
                    <n-radio-button
                      v-for="fv in filter.values"
                      :key="fv.value"
                      :value="fv.value"
                      size="small"
                      @change="
                        m.handle.changed.quickFilter({
                          ...fv,
                          whereFieldIs: filter.whereFieldIs,
                        })
                      "
                    >
                      <!-- @update:value="m.handle.changed.quickFilter(fv)" -->
                      {{ fv.label }}
                    </n-radio-button>
                  </n-radio-group>
                </n-popover>
              </n-input-group>
            </div>
            <!-- e.o. QUICK FILTER -->

            <!-- VIEW TRASH TOGGLE -->
            <div v-if="p.module.hasSoftDelete">
              <DisplaysTrash
                @trash-view-toggled="m.handle.emits.trashViewToggled"
              />
            </div>
            <!-- e.o VIEW TRASH TOGGLE -->

            <!-- SERACH -->
            <n-input
              size="small"
              :placeholder="`${helper.translate('search_in')} ${helper.translate(p.module.name.toLowerCase())} ${helper.translate('by')}  ${helper.translate(p.searchByFieldName)}...`"
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
        <!-- :data="d.data" -->
        <n-data-table
          ref="table"
          :columns="dataColumns"
          :pagination="false"
          :data="d.data"
          :bordered="true"
          empty="asdfasdf"
          max-height="calc(100vh - 304px)"
          size="small"
          @update:sorter="m.handle.changed.sort"
          @update:filters="m.handle.changed.filter"
        >
          <template #empty>
            <n-space
              vertical
              :size="10"
              style="text-align: center"
            >
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

type QuickFilterType = "single" | "multiple"

const tableRef = ref<DataTableInst | null>(null)
const table = tableRef

const helper = useHelpers()
const translationTitleMap: Record<string, string> = {
  Name: "name",
  Nickname: "nickname",
  "Contact Status": "contact_status",
  Description: "description",
  Email: "email",
  "Active Status": "active_status",
}

const translationOptionsMap: Record<string, string> = {
  All: "all",
  Active: "active",
  Paused: "paused",
  Archived: "archived",
  "New Contact": "new_contact",
  "Not Ready": "not_ready",
  Administrators: "administrators",
  "Church Planters": "church_planters",
  Guest: "guest",
}

const e = defineEmits(["refreshed"])

const p = withDefaults(
  defineProps<{
    module: Module
    storeOptions: StoreOptions
    formModalOptions: FormModalOptions
    searchByFieldName: string
    browseOptions?: false | BrowseCondition
    getAll: boolean
    needToRefresh?: boolean
  }>(),
  {
    browseOptions: false,
    getAll: false,
    needToRefresh: false,
  },
) // e.o p

const translatedFilterValues = computed(() => {
  // single filter
  if (!Array.isArray(p.module.options.filter)) {
    d.filterType = "single"

    return p.module.options.filter.values.map((filter: any) => {
      const key = translationOptionsMap[filter.label]
      return {
        ...filter,
        label: key ? helper.translate(key) : filter.label,
      }
    })
  } else {
    d.filterType = "multiple"
    const filters = JSON.parse(JSON.stringify(p.module.options.filter))
    const filterItemsMap = new Map<string, any>()

    filters.forEach((filterGroup: any) => {
      if (!filterItemsMap.has(filterGroup.whereFieldIs)) {
        filterItemsMap.set(filterGroup.whereFieldIs, {
          name: filterGroup.name,
          whereFieldIs: filterGroup.whereFieldIs,
          values: filterGroup.values.map((filter: any) => {
            const key = translationOptionsMap[filter.label]
            return {
              ...filter,
              label: key ? helper.translate(key) : filter.label,
            }
          }),
        })
      }
    })

    const filterItems = Array.from(filterItemsMap.values())

    return filterItems
  }
})

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
  filterType: "single" as QuickFilterType,

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
            d.selectedFilterOption = null
            table.value.clearFilters()
            m.handle.changed.filter([])
            m.browse()
          }
        }
      },
    },

    changed: {
      quickFilter: (
        value: string | { label: string; value: string; whereFieldIs: string },
      ) => {
        if (d.filterType === "single") {
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

            // need to check here for filter
            if (!Array.isArray(p.module.options.filter)) {
              d.browseQuery.search_by = p.module.options.filter.whereFieldIs
            }

            d.browseQuery.search = value as string

            m.browse()
          }
        } else {
          if (typeof value !== "string") {
            d.browseQuery.search_by = value.whereFieldIs
            d.browseQuery.search = value.value

            d.filteredOptions = []
            d.filteredOptions.push({
              key: value.whereFieldIs,
              value: [value.value],
            })
            m.browse()
          }
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
  // const columns = [...p.module.dataTable.columns]
  const translatedColumns = p.module.dataTable.columns.map((column: any) => {
    // Look up a translation key based on the original title.
    const translationKey = translationTitleMap[column.title]
    return translationKey
      ? { ...column, title: helper.translate(translationKey) }
      : column
  })

  translatedColumns.push({
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

  return translatedColumns
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

watch(
  () => p.needToRefresh,
  (newVal) => {
    if (newVal) {
      m.getData(d.defaultBrowseQuery)
      e("refreshed")
    }
  },
  { deep: true },
)

m.getData(d.defaultBrowseQuery)
</script>

<style></style>
