import type { FormModel } from "~/types/models"

export * from "~/types/models"

// export * from Models

export enum RoutePaths {
  AUTH_USER = "auth/user",
  AUTH_LOGOUT = "auth/logout",

  USERS = "users",
  USERS_ROLES = "users/roles",

  PEOPLE_GROUPS = "people-groups",
  DENOMINATIONS = "denominations",
  MOVEMENTS = "movements",
  FAITH_MILESTONES = "faith-milestones",
  COMMUNICATION_PLATFORMS = "communication-platforms",
  COMMUNITY_CHECKLISTS = "community-checklists",
  COMMUNITY_CHECKLIST_UPDATE = "community-checklists/update-all",

  CONTACTS = "contacts",
  CHURCHES = "churches",
  CHURCH_PLANTERS = "churches/planters",
  COMMUNITIES = "communities",

  LANGUAGES = "languages",
  LANGUAGE_WORDS = "languages/words",

  SETTINGS_STATUSES = "settings/statuses",
  SETTINGS_PRAYERS = "settings/prayers",

  NOTIFICATIONS = "notifications",

  MOVEMENT_NOTIFICATIONS = "movement-notifications",
  MOVEMENT_USERS = "movements/users",
  MOVEMENT_USER_VERIFICATIONS = "movements/verify-user",

  PROFILE_CHANGE_PASSWORD = "profile/change-password",

  PRAYER_PROMPTS = "prayer-prompts",

  DASHBOARD_INSIGHT = 'dashboard/insight',

  CHURCH_LOCATION = 'dashboard/church-locations',

  GENERATIONAL_CHURCHES_BY_TREE = 'dashboard/generational-churches-by-tree',
  GENERATIONAL_CHURCHES_BY_GRAPH = 'dashboard/generational-churches-by-graph',
  DASHBOARD_PEOPLE_GROUPS = 'dashboard/people-groups'
}

export type GenderTypes = "male" | "female"

export type AgeGroups =
  | "Under 18 years old"
  | "18-25 years old"
  | "26-40 years old"
  | "Over 40 years old"

export type StoreOptions =
  | false
  | {
    storeState: any
    isPersist: boolean
    key: string
  }

export type CommonBrowseCondition = {
  search?: string
  search_by?: string

  sort?: { key: string; order: "asc" | "desc" }[]

  whereIn?: { key: string; value: any[] }
  whereNotIn?: { key: string; value: any[] }
  whereHas?: { key: string; where: string; value: any }
  limit?: number

  // with?: string[]
  with?: any

  // where?: { key: string; value: any }[]
  where?: any
  withExists?: string[]

  onlyTrashed?: boolean
}

export interface BrowseConditionAll extends CommonBrowseCondition {
  all: true
}

export interface BrowseConditionPaged extends CommonBrowseCondition {
  page: number
  per_page: number
}

export type BrowseCondition = BrowseConditionAll | BrowseConditionPaged

export type ListCondition = {
  labelOption: string
  limit: number
}

export type FilterOptions =
  | false
  | { whereFieldIs: string; values: { label: string; value: string }[] }
  | { name: string; whereFieldIs: string; values: { label: string; value: string }[] }[]

export type ModalWidthSize =
  | "600px"
  | "800px"
  | "1000px"
  | "50%"
  | "calc(100vw - 40px)"
  | string

export type FormModalOptions = {
  moduleName?: string
  routePath: RoutePaths
  components: {
    formComponent: Object
    buttonIconComponent?: Object
  }
  form: FormModel
  hiddenFieldsOnEdit: string[]
  width?: ModalWidthSize
  communityId?: number
}
