<template>
  <GenericsActionBar v-if="!isMobile">
    <template #left>
      <b>{{ isMobile ? ' ' : helpers.translate("manage_community_checklist") }}</b>
    </template>

    <template #right> </template>
  </GenericsActionBar>

  <DisplaysDataTable
    :module="module"
    :store-options="d.storeOptions"
    :form-modal-options="d.formModalOptions"
    :search-by-field-name="d.searchByFieldName"
    :get-all="true"
    :need-to-refresh="d.needToRefresh"
    @refreshed="d.needToRefresh = false"
  />
</template>

<script
  lang="ts"
  setup
>
  import { NIcon, NButton } from "naive-ui"
  import type { StoreOptions, FormModalOptions } from "~/types/index.d"
  import { RoutePaths } from "~/types/index.d"
  import type { Module } from "~/utils/modules"
  import modules from "~/utils/modules"
  import { useCommunityStore } from "~/stores/useCommunitiesStore"
  import { ArrowUpwardRound, ArrowDownwardRound } from "@vicons/material"
  import { computed } from "vue"

  const module = modules.communityChecklist as Module
  const helpers = useHelpers()
  const { isMobile } = useDevice()

  const d = reactive({
    loading: {
      page: false,
    },
    needToRefresh: false,

    // Change to the field that you want to search.
    searchByFieldName: "name",

    // All store options getting from module.
    // Need to change storeState
    // order by order column

    storeOptions: {
      storeState: module.store.communityChecklists,
      ...module.options.store,
    } as StoreOptions,

    // All form options getting from module. No need to change
    formModalOptions: {
      moduleName: module.name,
      components: {
        formComponent: module.form.component,
        buttonIconComponent: module.form.createButtonIconComponent,
      },
      routePath: module.routePath,
      width: module.form.modalWidthSize,
      hiddenFieldsOnEdit: module.dataTable.hiddenFieldsOnEdit,
      form: module.form.model,
    } as FormModalOptions,
  })

  const communityChecklistsUpdateModel = RoutePaths.COMMUNITY_CHECKLIST_UPDATE

  onMounted(() => {
    const store = useCommunityStore()
    const communityChecklists = store.communityChecklists
    console.log("Original Order", communityChecklists)
  })
  const m = {
    render: {
      orderColumn: () => {
        const orderColumn = module.dataTable.columns.find(
          (c: any) => c.title === "Order",
        )
        if (orderColumn) {
          orderColumn.render = (row: any) => {
            const store = useCommunityStore()
            const communityChecklists = computed(() => store.communityChecklists)

            function createMoveHandler(direction: 1 | -1) {
              return async (row: any) => {
                const currentItem = communityChecklists.value.find(
                  (item: any) => item.id === row.id,
                )
                if (!currentItem) return

                const targetOrder = currentItem.order + direction
                const targetItem = communityChecklists.value.find(
                  (item: any) => item.order === targetOrder,
                )

                if (targetItem) {
                  targetItem.order = currentItem.order
                  currentItem.order = targetOrder

                  const updateApi = useConsumeApi(communityChecklistsUpdateModel)
                  const res = await updateApi.save(communityChecklists.value)
                  if (res) {
                    d.needToRefresh = true
                  }
                }
              }
            }
            const moveUp = createMoveHandler(1)
            const moveDown = createMoveHandler(-1)
            return h(
              "div",
              { style: "display: flex; gap: 8px; align-items: center;" },
              [
                h(
                  NButton,
                  {
                    size: "small",
                    tertiary: true,
                    circle: true,
                    onClick: () => moveUp(row),
                  },
                  {
                    icon: () =>
                      h(NIcon, null, { default: () => h(ArrowUpwardRound) }),
                  },
                ),
                h(
                  NButton,
                  {
                    size: "small",
                    tertiary: true,
                    circle: true,
                    onClick: () => moveDown(row),
                  },
                  {
                    icon: () =>
                      h(NIcon, null, { default: () => h(ArrowDownwardRound) }),
                  },
                ),
              ],
            )
          }
        }
      },
    },
  }

  m.render.orderColumn()
</script>

<style></style>