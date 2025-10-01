<template>
  <div class="container">
    <!-- <div @click="toggleNavigation"> -->
    <div>
      {{ pageName.toUpperCase() }}
    </div>

    <div class="controls">
      <div>
        <FormPartialsLanguageSwitcher :screen-size="mobile" />
      </div>
      <div>
        <FormPartialsThemeSwitcher :screen-size="mobile" />
      </div>

      <n-flex
        justify="center"
        align="center"
      >
        <n-icon :size="20">
          <n-text type="primary">
            <MenuRound
              v-if="!showNav"
              @click="toggleNavigation"
            />
            <CloseRound
              v-else
              @click="toggleNavigation"
            />
          </n-text>
        </n-icon>
      </n-flex>

    </div>
  </div>
  <Transition name="dropdown">
    <div
      v-if="showNav"
      class="mobile-nav"
    >
      <IncludesMobileNavigation @link-clicked="showNav = false" />
    </div>
  </Transition>
</template>


<script
  lang="ts"
  setup
>
  import { MenuRound, CloseRound } from '@vicons/material'
  const route = useRoute()
  const mobile = ref(true)

  const h = useHelpers()
  const showNav = ref(false)

  const toggleNavigation = () => {
    showNav.value = !showNav.value
  }

  const pageName = computed(() => {
    const page = route.fullPath.split("/")[1]

    if (page.startsWith("dashboard")) {
      return h.translate("dashboard")

    }

    if (page.startsWith("settings")) {
      const query = route.query

      if (query && query.settingType) {
        const settingNameQueryString = query.settingType as string
        let settingName = settingNameQueryString.replaceAll("_", " ")

        return `${h.translate("settings")} `
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
  .container {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: max-height 0.6s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .dropdown-enter-to,
  .dropdown-leave-from {
    max-height: 500px;
    opacity: 1;
  }
</style>