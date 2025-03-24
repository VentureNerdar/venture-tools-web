import { defineStore } from 'pinia'

enum Models {
  'auth/user',
  'auth/logout',

  'users',
  'users/roles',
}

type BrowseCondition = {
  page?: number,
  limit?: number,
  search?: string,
  sort?: string,
}

export const useCrudStore = defineStore({
  id: 'crudStore',
  state: () => ({ }),
  actions: {
    async browse(model:Models, ) {
    },

    async create(model:Models, ) {
    },

    async view(model:Models, ) {
    },

    async update(model:Models, ) {
    },

    async delete(model:Models, ) {
    },

    async trash(model:Models, ) {
    }
  }
})
