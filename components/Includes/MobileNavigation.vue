<template>
  <div
    class="links"
    v-for="nav in userRoledNavItems"
    :key="nav.link"
  >
    <div class="link">
      <NuxtLink
        :to="nav.link"
        class="nuxt-link"
        @click="handleClick"
      >
        {{ nav.title.toUpperCase() }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

interface NavigationItem {
  title: string
  link: string
  roles: number[]
}

const emit = defineEmits(["link-clicked"])
const h = useHelpers()
const auth = useAuthStore()



const navItems = [
  {
    title: "Dashboard",
    link: "/",
    roles: [1, 2, 3, 4],
  },
  {
    title: "Prayers",
    link: "/prayers",
    roles: [1, 3, 4],
  },
  {
    title: "Contacts",
    link: "/contacts",
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Churches",
    link: "/churches",
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Communities",
    link: "/communities",
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Settings",
    link: "/settings?settingType=users",
    roles: [1, 2],
  },
  {
    title: "Notifications",
    link: "/notifications",
    roles: [3],
  },
  {
    title: "Movement Users",
    link: "/movement-users",
    roles: [3],
  },
] as NavigationItem[]

const handleClick = () => {
  emit('link-clicked')
}
const userRoledNavItems = computed(() => {
  return navItems
    .filter((item) => item.roles.includes(auth.authUser.user_role_id))
    .map((item) => ({
      ...item,
      title: h.translate(h.toSnakeCase(item.title)),
    }))
})
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #17badf1a;
  border: 1px solid #17badf2a;

  .link {
    width: 100%;
    text-align: center;

    .nuxt-link {
      padding: 10px;
      display: block;
      text-decoration: none;
      color: #fff;
      width: 100%;
    }
  }
}
</style>