<template>
  <div class="header">
    <n-flex justify="space-between">
      <div>

        <div class="brand">
          Venture Tools
        </div>

        <span class="page-name">
          {{ pageName }}
        </span>
      </div>

      <div class="controls">
      </div>
    </n-flex>
  </div>
</template>

<script
  lang="ts"
  setup
>

  const route = useRoute()

  const pageName = computed(() => {
    const page = route.fullPath.split('/')[1]

    if (page.startsWith('settings')) {
      const query = page.split('?')[1]
      const settingType = query.split('=')[1].replaceAll('_', ' ')
      return 'Settings > ' + settingType
    } else {
      return page
    }

  });

</script>

<style
  lang="scss"
  scoped
>
  html {

    .header {
      height: 40px;
      line-height: 40px;
      background: #eee;
      padding: 0 10px;
      padding-left: 5px;

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

  html.dark {
    .header {
      height: 39px;
      background: #021526;
      border-bottom: 1px solid rgba(255, 255, 25, 0.08);
    }
  }
</style>