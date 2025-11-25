import type * as types from "@/types/models"

export default {
  user: {
    name: null,
    // username: null,
    password: null,
    user_role_id: "3",
    biography: null,
    preferred_language_id: null,
    email: null,
    phone_number: null,
    is_active: true,
    first_time_login: true,
  } as types.UserFormModel,

  userRole: {
    name: null,
    label: null,
    description: null,
  } as types.UserRoleFormModel,

  contact: {
    is_active: true,
    contact_status_id: 1,
    position_id: 8,
    name: null,
    gender: null,
    age: null,
  } as types.ContactFormModel,

  church: {
    is_active: true,
    assigned_to: null,

    church_planters: [],
    community_id: null,
    community: [],

    name: null,
    description: null,
    founded_at: null,
    phone_number: null,
    website: null,
    denomination_id: null,
    is_visited: false,

    church_members_count: null,
    confession_of_faith_count: null,
    baptism_count: null,

    parent_church_id: null,
    current_prayers: null,

    location_longitude: null,
    location_latitude: null,
    google_location_data: null,
    province_name: null,
    district_name: null,
  } as types.ChurchFormModel,

  community: {
    is_active: true,
    name: null,
    location_longitude: null,
    location_latitude: null,
    google_location_data: null,
    conducted_survey_of_community_needs: false,
    community_needs_1: null,
    community_needs_2: null,
    community_needs_3: null,
    community_needs_4: null,
    community_needs_5: null,
    peace_persons: [] as any[],
    committees: [] as any[],
    province_name: null,
    district_name: null,
    churchPlanters: [] as any[],
    churches: [] as any[],
  },

  communityChecklist: {
    name: null,
  } as types.CommunityChecklistFormModel,

  notification: {
    name: null,
    value: null,
  } as types.NotificationFormModel,

  insight: {
    avg_church_size: null,
    baptized_member_count: null,
    church_count: null,
    contact_baptized_count: null,
  } as types.InsightFormModel,

  churchLocation: {
    lat: 0,
    lng: 0,
    name: "",
  } as types.ChurchLocationFormModel,

} as const
