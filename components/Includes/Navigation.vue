<template>
  <div class="sidebar">
    <div style="height: calc(100vh - 60px)">
      <n-flex
        vertical
        justify="space-between"
        style="height: calc(100vh - 50px)"
      >
        <n-flex justify="center">
          <n-flex
            vertical
            justify="center"
          >
            <div
              v-for="ni in userRoledNavItems"
              :key="ni.title"
              :to="ni.link"
              :icon="ni.icon"
              @click="navigateTo(ni.link)"
            >
              <!-- :style="`visibility: ${ni.roles && item.roles.includes(auth.authUser.user_role_id) ? 'visible' : 'hidden'}`" -->
              <n-tooltip
                trigger="hover"
                placement="right"
              >
                <template #trigger>
                  <div class="link">
                    <component
                      :is="ni.icon"
                      class="icon"
                    />
                  </div>
                </template>

                {{ ni.title }}
              </n-tooltip>
            </div>
          </n-flex>
        </n-flex>

        <n-flex
          justify="center"
          style="margin-bottom: 10px"
        >
          <n-flex
            vertical
            justify="center"
          >
            <div
              v-for="item in userBottomNav"
              :key="item.title"
              :to="item.link"
              :icon="item.icon"
              @click="item.onClick ? item.onClick() : null"
            >
              <n-tooltip
                trigger="hover"
                placement="right"
              >
                <template #trigger>
                  <div class="link">
                    <component
                      :is="item.icon"
                      class="icon"
                    />
                  </div>
                </template>

                {{ item.title }}
              </n-tooltip>
            </div>
          </n-flex>
        </n-flex>
      </n-flex>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  DashboardRound,
  PersonRound,
  ChurchRound,
  GroupRound,
  SettingsRound,
  AccountCircleRound,
  LogOutRound,
  CircleNotificationsFilled,
} from "@vicons/material"

import { PrayingHands } from "@vicons/fa"

import { useAuthStore } from "~/stores/useAuthStore"

// Define a type for a navigation item
interface NavigationItem {
  title: string
  link: string
  icon: any // You can replace this with a more specific type if needed
  roles: number[] // Array of roles
}

const auth = useAuthStore()

const navItems = [
  {
    title: "Dashboard",
    link: "/",
    icon: DashboardRound,
    roles: [1, 2],
  },
  {
    title: "Prayers",
    link: "/prayers",
    icon: PrayingHands,
    roles: [1, 3, 4],
  },
  {
    title: "Contacts",
    link: "/contacts",
    icon: PersonRound,
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Churches",
    link: "/churches",
    icon: ChurchRound,
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Communities",
    link: "/communities",
    icon: GroupRound,
    roles: [1, 2, 3, 4, 5],
  },
  {
    title: "Settings",
    link: "/settings?settingType=users",
    icon: SettingsRound,
    roles: [1, 2],
  },
  {
    title: "Notifications",
    link: "/notifications",
    icon: CircleNotificationsFilled,
    roles: [3],
  },
  {
    title: "Movement Users",
    link: "/movement-users",
    icon: PersonRound,
    roles: [3],
  },
] as NavigationItem[]

const h = useHelpers()

const userRoledNavItems = computed(() => {
  return navItems
    .filter((item) => item.roles.includes(auth.authUser.user_role_id))
    .map((item) => ({
      ...item,
      title: h.translate(h.toSnakeCase(item.title)),
    }))
})

const handleLogout = async () => {
  await auth.logout()
}

const bottomNavigation = shallowRef([
  {
    title: "Profile",
    link: "/profile",
    icon: AccountCircleRound,
    onClick: () => {
      navigateTo("/profile")
    },
  },
  {
    title: "Logout",
    link: "/logout",
    icon: LogOutRound,
    onClick: handleLogout,
  },
])
const userBottomNav = computed(() => {
  return bottomNavigation.value.map((item) => {
    const translationKey =
      item.title === "Logout" ? "log_out" : item.title.toLowerCase()

    return {
      ...item,
      title: h.translate(translationKey),
    }
  })
})
</script>

<style lang="scss" scoped>
.sidebar {
  border-right: 1px solid #eee;
  width: 60px;
  float: left;
  height: calc(100vh - 60px);
  padding: 10px 0;

  .link {
    background: #17badf;
    color: white;
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #0a233d;
    }

    .icon {
      width: 20px;
    }
  }
}

html.dark {
  .sidebar {
    border-right-color: rgba(255, 255, 255, 0.08);

    .link {
      &:hover {
        background-color: #00657c;
      }
    }
  }
}
</style>
