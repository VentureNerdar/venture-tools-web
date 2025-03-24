import type { AgeGroups, GenderTypes } from "."

export interface UserFormModel {
  name: string | null
  username: string | null
  email: string | null
  user_role_id: string | null
  is_active: boolean
  phone_number: string | null
  biography: string | null
  preferred_language_id: number | null
  id?: number
  password?: string | null
  password_confirmation?: string | null
  last_login_at?: Date
  email_verified_at?: Date
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ContactFormModel {
  id?: number
  contact_status_id: number | null
  assigned_to?: number | null
  faith_status_id: number | null
  coached_by?: number | null

  name: string | null
  nickname?: string | null
  gender: GenderTypes | null
  age: AgeGroups | null
  baptism_date?: any | null
  baptized_by?: number | null
  current_prayers?: string | null
  faith_milestones?: number[] | null
  people_group?: number[] | null
  contact_communication_platforms?: { [key: number]: any[] } | null

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ChurchFormModel {
  id?: number
  is_active: boolean
  assigned_to?: number | null

  church_planters?: any | null

  name: string | null
  description?: string | null
  founded_at?: any | null
  phone_number?: string | null
  website?: string | null
  denomination_id?: number | null
  is_visited?: boolean
  church_members_count?: number | null
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

export interface LanguageFormModel {}

export interface LanguageWordFormModel {}

export interface DenominationFormModel {
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
  translations: Object | null
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

  name: string | null
  location_longitude: string | null
  location_latitude: string | null
  conducted_survey_of_community_needs: boolean
  community_needs_1: string | null
  community_needs_2: string | null
  community_needs_3: string | null
  community_needs_4: string | null
  community_needs_5: string | null

  peace_persons: CommunityPeacePersonFormModel[]
  committees: CommunityCommittee[]

  checklists?:
    | CommunityChecklistFormModel[]
    | { id: number; checked: boolean }[]
    | number[]
    | null

  churches: ChurchFormModel[] | null
  churchPlanters: [] | null

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
  | LanguageWordFormModel
  | DenominationFormModel
  | FaithMilestoneFormModel
  | CommunicationPlatformFormModel
  | CommunityChecklistFormModel
