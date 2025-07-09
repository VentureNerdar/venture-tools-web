<template>
  <div class="header">
    <n-flex justify="space-between">
      <div>
        <div class="brand">
          {{ h.translate("venture_tool") }}
        </div>

        <span class="page-name">
          {{ pageName }}
        </span>
      </div>

      <div class="controls">
        <div>
          <FormPartialsLanguageSwitcher />
        </div>
        <div>
          <FormPartialsThemeSwitcher />
        </div>
      </div>
    </n-flex>
  </div>
</template>

<script
  lang="ts"
  setup
>
  const route = useRoute()

  const h = useHelpers()

  const pageName = computed(() => {
    const page = route.fullPath.split("/")[1]

    if (page.startsWith("dashboard")) {
      const query = route.query

      if (query && query.dashboardType) {
        const dashboardNameQueryString = query.dashboardType as string
        const dashboardName = dashboardNameQueryString.replaceAll("_", " ")
        return `${h.translate("dashboard")} > ${h.translate(h.toSnakeCase(dashboardName.trim())) ? h.translate(h.toSnakeCase(dashboardName.trim())) : h.toSnakeCase(dashboardName.trim())}`
      }
    }

    if (page.startsWith("settings")) {
      const query = route.query

      if (query && query.settingType) {
        const settingNameQueryString = query.settingType as string
        const settingName = settingNameQueryString.replaceAll("_", " ")
        return `${h.translate("settings")} > ${h.translate(h.toSnakeCase(settingName.trim())) ? h.translate(h.toSnakeCase(settingName.trim())) : h.toSnakeCase(settingName.trim())}`
      }
    }


    return h.translate(h.toSnakeCase(page)) === ""
      ? page
      : h.translate(h.toSnakeCase(page))
  })
</script>

<style
  lang="scss"
  scoped
>
  html {
    .header {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      padding-left: 5px;

      &.dark {}

      .controls {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-right: 10px;
      }

      .brand {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 800;
        color: #17badf;
        color: white;
        background: #17badf;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        display: inline-block;
        border-radius: 4px;
        /* float: left; */
      }

      .page-name {
        display: inline-block;
        padding-left: 10px;
        color: #17badf;
        text-transform: uppercase;
      }
    }
  }

  html {

    &.dark {
      .header {
        height: 39px;
        // background: #021526;
        border-bottom: 1px solid rgba(204, 204, 204, 0.08);
      }
    }

    &.light {
      .header {
        /* background: white; */
        height: 39px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      }
    }
  }
</style>
