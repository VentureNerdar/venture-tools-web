import type * as models from "@/types/models"
import defaultModelForms from "@/utils/models"
import type { ModalWidthSize, FilterOptions } from "@/types/index.d"
import type { DataTableColumn, FormRules } from "naive-ui"
import { NTag, NAvatar } from "naive-ui"

import { RoutePaths } from "@/types/index.d"
import { getStores } from "@/utils/stores"
import forms from "@/utils/forms"
import views from "@/utils/views"
import { PersonAddAlt1Round } from "@vicons/material"

const stores = getStores()

export type Module = {
  /**
   * Name of the module. This is the backend's Model.
   * @type {string}
   *
   */
  name: string
  label?: string

  /**
   * If the model has soft deletes, this should be set as true, else false.
   * @type {boolean}
   */
  hasSoftDelete: boolean

  /**
   * Route path of the module.
   * This is used for the routing of the module.
   * This has to be the same with backend's route path.
   * If new route path is added in the backend, this has to be added at {@link RoutePaths} as well.
   *
   * @type {RoutePaths}
   */
  routePath: RoutePaths

  // store of the module
  store: any

  // data table options
  // this is needed for the data table component
  dataTable: {
    columns: DataTableColumn[]
    hiddenFieldsOnEdit: string[]
    fields: string[]
  }

  // form options
  // this is needed for the save form component
  form: {
    model: models.FormModel
    rules: FormRules
    component: object
    createButtonIconComponent?: object
    modalWidthSize: ModalWidthSize
  }

  view?: {
    component: object
    modalWidthSize: ModalWidthSize
  }

  // other options
  options: {
    // filter options
    filter: FilterOptions

    // store options
    store: { isPersist: boolean; key: string }
  }
}

export default {
  // USERS
  users: {
    name: "User",
    hasSoftDelete: true,
    routePath: RoutePaths.USERS,
    store: stores.user,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Email",
          key: "email",
          sorter: true,
        },
        {
          title: "Active Status",
          key: "is_active",
          align: "center",
          filter: true,
          filterOptions: [
            { label: "Active", value: 1 },
            { label: "Inactive", value: 0 },
          ],
          render: (row: any) => {
            return h(
              NTag,
              {
                style: {
                  marginRight: "6px",
                },
                type: row.is_active ? "success" : "default",
                bordered: false,
              },
              {
                default: () => (row.is_active ? "Active" : "Inactive"),
              },
            )
          },
        },
      ],
      fields: [
        "name",
        "username",
        "email",
        "user_role_id",
        "is_active",
        "phone_number",
        "biography",
        "preferred_language_id",
      ],
      hiddenFieldsOnEdit: ["password", "password_confirmation"],
    },

    form: {
      model: {
        name: null,
        username: null,
        password: null,
        user_role_id: "3",
        biography: null,
        preferred_language_id: null,
        email: null,
        phone_number: null,
        is_active: true,
      } as models.UserFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        username: [
          { required: true, message: "Username is required", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 8,
            message: "Password must be at least 8 characters",
            trigger: ["input", "blur"],
          },
        ],
        user_role_id: [{ required: true, message: "User Role is required" }],
        email: [{ required: true, message: "Email is required" }],
      },
      component: markRaw(forms.user),
      createButtonIconComponent: markRaw(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.user,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "users",
      },
      filter: [
        {
          name: "User Role",
          whereFieldIs: "user_role_id",
          values: [
            {
              label: "Movement Leaders",
              value: "3",
            },
            {
              label: "Church Planters",
              value: "4",
            },
            {
              label: "Guest",
              value: "5",
            },
          ],
        },
      ],
    },
  } as Module, // e.o USERS

  // USER ROLES
  userRoles: {
    name: "User Roles",
    hasSoftDelete: true,
    routePath: RoutePaths.USERS_ROLES,
    store: stores.user,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Label",
          key: "label",
          sorter: true,
        },
        {
          title: "Description",
          key: "description",
          sorter: false,
        },
      ],
      fields: ["name", "label", "description"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
        label: null,
        description: null,
      } as models.UserRoleFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        label: [
          { required: true, message: "Label is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.userRole),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.userRole,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "userRoles",
      },
      filter: false,
    },
  } as Module, // e.o USER ROLES

  contacts: {
    name: "Contacts",
    hasSoftDelete: true,
    routePath: RoutePaths.CONTACTS,
    store: stores.contacts,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Nickname",
          key: "nickname",
        },
        {
          title: "Status",
          key: "is_active",
          align: "center",
          render(row) {
            // return row.is_active ? "Active" : "Inactive"
            return h(
              NTag,
              {
                type: row.is_active ? "success" : "default",
                bordered: false,
              },
              { default: () => (row.is_active ? "Active" : "Inactive") },
            )
          },
        },
      ],
      fields: ["name", "nickname"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      // model: { ...formModels.contacts as any } as models.ContactFormModel,
      model: defaultModelForms.contact as models.ContactFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        gender: [
          {
            required: true,
            message: "Gender needs to be specified.",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "Age needs to be specified.",
            trigger: "blur",
          },
        ],
        // contact_status_id: [{ required: true, message: 'Contact status needs to be specified.', trigger: 'blur' }],
        // faith_status_id: [{ required: true, message: 'Faith status needs to be specified.', trigger: 'blur' }],
      },
      component: shallowRef(forms.contact),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "calc(100vw - 40px)" as ModalWidthSize,
    },

    view: {
      component: views.contact,
      modalWidthSize: "calc(100vw - 40px)" as ModalWidthSize,
    },

    options: {
      store: {
        isPersist: true,
        key: "contacts",
      },
      filter: false,
      // filter: {
      //   whereFieldIs: "contact_status_id",
      //   values: [
      //     {
      //       label: "Active",
      //       value: "1",
      //     },
      //     {
      //       label: "Paused",
      //       value: "2",
      //     },
      //     {
      //       label: "Archived",
      //       value: "3",
      //     },
      //     {
      //       label: "New Contact",
      //       value: "4",
      //     },
      //     {
      //       label: "Not Ready",
      //       value: "5",
      //     },
      //   ],
      // },
    },
  } as Module,

  churches: {
    name: "Churches",
    hasSoftDelete: true,
    routePath: RoutePaths.CHURCHES,
    store: stores.churches,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Description",
          key: "description",
        },
      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: defaultModelForms.church as models.ChurchFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        community_id: [
          { required: true, message: "Community is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.church),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "calc(100vw - 40px)",
    },

    view: {
      component: views.church,
      modalWidthSize: "calc(100vw - 40px)",
    },

    options: {
      store: {
        isPersist: true,
        key: "churches",
      },
      filter: false,
    },
  } as Module,

  communities: {
    name: "Communities",
    hasSoftDelete: true,
    routePath: RoutePaths.COMMUNITIES,
    store: stores.communities,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: defaultModelForms.community as models.CommunityFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        location_longitude: [
          { required: true, message: "Longitude is required", trigger: "blur" },
        ],
        location_latitude: [
          { required: true, message: "Latitude is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.community),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "calc(100vw - 40px)",
    },

    view: {
      component: views.community,
      modalWidthSize: "calc(100vw - 40px)",
    },

    options: {
      store: {
        isPersist: true,
        key: "communities",
      },
      filter: false,
    },
  } as Module,

  communicationPlatforms: {
    name: "Communication Platforms",
    hasSoftDelete: true,
    routePath: RoutePaths.COMMUNICATION_PLATFORMS,
    store: stores.communicationPlatforms,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
      } as models.CommunicationPlatformFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.communicationPlatform),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.communicationPlatform,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "communicationPlatforms",
      },
      filter: false,
    },
  } as Module,

  faithMilestones: {
    name: "Faith Milestones",
    hasSoftDelete: true,
    routePath: RoutePaths.FAITH_MILESTONES,
    store: stores.faithMilestones,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Icon",
          key: "icon",
          align: "center",
          render(row: any) {
            const conf = useRuntimeConfig()

            return h(
              NAvatar,
              {
                size: "large",
                style: "backgroundColor: rgba(0,0,0,0.2); padding: 5px;",
                src: conf.public.rootURL + row.icon,
              },
              {},
            )
          },
        },
      ],
      fields: ["name", "icon"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
        icon: null,
      } as models.FaithMilestoneFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
        icon: [
          { required: true, message: "Icon is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.faithMilestone),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.faithMilestone,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "faithMilestones",
      },
      filter: false,
    },
  } as Module,

  peopleGroups: {
    name: "People Groups",
    hasSoftDelete: true,
    routePath: RoutePaths.PEOPLE_GROUPS,
    store: stores.peopleGroups,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
      } as models.PeopleGroupFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.peopleGroup),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.peopleGroup,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "peopleGroups",
      },
      filter: false,
    },
  } as Module, // e.o People Groups

  denominations: {
    name: "Denominations",
    hasSoftDelete: true,
    routePath: RoutePaths.DENOMINATIONS,
    store: stores.denominations,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Description",
          key: "description",
        },
      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
      } as models.DenominationFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.denomination),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.denomination,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "denominations",
      },
      filter: false,
    },
  } as Module, // e.o Denominations

  // MOVEMENTS
  movements: {
    name: "Movements",
    hasSoftDelete: true,
    routePath: RoutePaths.MOVEMENTS,
    store: stores.movements,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Description",
          key: "description",
        },
      ],
      fields: ["name", "description"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        name: null,
      } as models.MovementFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.movement),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.movement,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "movements",
      },
      filter: false,
    },
  } as Module, // e.o Movements

  // COMMUNITY CHECKLISTS
  communityChecklist: {
    name: "Community Checklist",
    hasSoftDelete: true,
    routePath: RoutePaths.COMMUNITY_CHECKLISTS,
    store: stores.communities,

    dataTable: {
      columns: [
        {
          title: "Name",
          key: "name",
          sorter: true,
        },
        {
          title: "Order",
          key: "order",
          sorter: true,
        },


      ],
      fields: ["name"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model:
        defaultModelForms.communityChecklist as models.CommunityChecklistFormModel,
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
        ],
      },
      component: shallowRef(forms.communityChecklist),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.communityChecklist,
      modalWidthSize: "600px",
    },

    options: {
      store: {
        isPersist: true,
        key: "communityChecklists",
      },
      filter: false,
    },
  } as Module, // e.o Community Checklists

  // PRAYER PROMPTS
  prayerPrompts: {
    name: "Prayer Prompts",
    hasSoftDelete: true,
    routePath: RoutePaths.PRAYER_PROMPTS,
    store: stores.prayerPrompts,

    dataTable: {
      columns: [
        {
          title: "Prompt Text",
          key: "prompt_text",
          sorter: true,
        },
      ],
      fields: ["prompt_text"],
      hiddenFieldsOnEdit: [],
    },

    form: {
      model: {
        prompt_text: null,
      } as models.PrayerPromptFormModel,
      rules: {
        prompt_text: [
          {
            required: true,
            message: "Prompt Text is required",
            trigger: "blur",
          },
        ],
      },
      component: shallowRef(forms.prayerPrompt),
      // createButtonIconComponent: shallowRef(PersonAddAlt1Round),
      modalWidthSize: "600px",
    },

    view: {
      component: views.prayerPrompt,
      modalWidthSize: "1000px",
    },

    options: {
      store: {
        isPersist: true,
        key: "denominations",
      },
      filter: false,
    },
  } as Module, // e.o Prayer Prompts

  systemLanguages: {},

  systemLanguageWords: {},
}
