import type { AgeGroups, GenderTypes } from "."

export interface UserFormModel {
  name: string | null
  username: string | null
  email: string | null
  user_role_id: string | null
  movement_id: number | null
  is_active: boolean
  phone_number: string | null
  biography: string | null
  preferred_language_id: number | null
  id?: number
  contact_id?: number | null
  password?: string | null
  password_confirmation?: string | null
  last_login_at?: Date
  email_verified_at?: Date
  is_verified?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ContactFormModel {
  id?: number
  contact_status_id: number | null
  is_active: boolean
  assigned_to?: number | null
  faith_status_id: number | null
  coached_by?: number | null

  name: string | null
  nickname?: string | null
  gender: GenderTypes | null
  age: AgeGroups | null
  baptism_date?: any | null
  baptized_by?: number | null
  baptized_by_name?: string | null
  current_prayers?: string | null
  faith_milestones?: number[] | null
  people_group?: number[] | null
  contact_communication_platforms?: { [key: number]: any[] } | null
  user_profile_id?: number | null
  user_profile?: UserFormModel | null

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ChurchFormModel {
  id?: number
  is_active: boolean
  assigned_to?: number | null

  church_planters?: any | null

  location_longitude: string | number | null
  location_latitude: string | number | null
  google_location_data: string | any[] | null
  province_name: string | null
  district_name: string | null


  name: string | null
  description?: string | null
  founded_at?: any | null
  phone_number?: string | null
  website?: string | null
  denomination_id?: number | null
  is_visited?: boolean
  church_members_count?: number | null
  member_count_by_people_group?: boolean | null
  member_count_list_by_people_group?: { people_group_id: number, amount: number }[]
  church_members?: { people_group_id: number, amount: number }[]

  confession_of_faith_count?: number | null
  baptism_count?: number | null
  community_id: number | null
  community?: CommunityFormModel[] | null

  parent_church_id?: number | null
  current_prayers?: string | null

  deleted_at?: Date
  created_at?: Date
  updated_at?: Date
}

export interface LanguageFormModel {
  id?: number
  is_enabled: number
  label: string
  name: string
  locale: string
  created_at: Date
  updated_at: Date
  translations: [LanguageTranslationFormModel]
}

export interface LanguageTranslationFormModel {
  id?: number
  system_language_id: number
  system_language_word_id: number
  translation: string
  created_at: Date
  updated_at: Date
}

export interface LanguageWordFormModel {
  id?: number
  word: string
  created_at: Date
  updated_at: Date
}

export interface DenominationFormModel {
  name: string | null
  description?: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface MovementFormModel {
  name: string | null
  description?: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunicationPlatformFormModel {
  name: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface UserRoleFormModel {
  name: string | null
  label: string | null
  description?: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface PeopleGroupFormModel {
  name: string | null
  translations: object | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface FaithMilestoneFormModel {
  name: string | null
  icon: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunityChecklistFormModel {
  name: string | null
  order: number
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunityPeacePersonFormModel {
  id?: number
  name: string | null
  email: string | null
  phone: string | null
  originalName?: string | null

  created_at?: Date
  updated_at?: Date
}

export interface CommunityCommittee {
  id?: number
  name: string | null
  originalName?: string | null

  created_at?: Date
  updated_at?: Date
}

export interface CommunityFormModel {
  id?: number
  is_active: boolean
  name: string | null
  location_longitude: string | number | null
  location_latitude: string | number | null
  google_location_data: string | any[] | null
  province_name: string | null
  district_name: string | null
  conducted_survey_of_community_needs: boolean
  community_needs_1: string | null
  community_needs_2: string | null
  community_needs_3: string | null
  community_needs_4: string | null
  community_needs_5: string | null

  peace_persons?: CommunityPeacePersonFormModel[]
  committees?: CommunityCommittee[]

  checklists?:
  | CommunityChecklistFormModel[]
  | { id: number; checked: boolean }[]
  | number[]
  | null

  churches: ChurchFormModel[] | null
  churchPlanters: [] | null
  created_by?: number | null

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface NotificationFormModel {
  id?: number
  name: string | null
  value: string | null
  created_at?: Date
  updated_at?: Date
}

export interface MovementNotificationFormModel {
  id?: number
  user_id: number | null
  title: string | null
  body: string | null
  created_at?: Date
  updated_at?: Date
}

export interface PrayerPromptFormModel {
  id?: number
  prompt_text: string | null
  user_id: number | null
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export type FormModel =
  | UserFormModel
  | UserRoleFormModel
  | PeopleGroupFormModel
  | ContactFormModel
  | ChurchFormModel
  | CommunityFormModel
  | LanguageFormModel
  | LanguageTranslationFormModel
  | LanguageWordFormModel
  | DenominationFormModel
  | MovementFormModel
  | FaithMilestoneFormModel
  | CommunicationPlatformFormModel
  | CommunityChecklistFormModel
  | NotificationFormModel
  | MovementNotificationFormModel
  | PrayerPromptFormModel
