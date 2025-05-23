import { defineStore } from "pinia"

export const useMovementsStore = defineStore('movements', () => {
  const movements = JSON.parse(localStorage.getItem('movements') || '{}')
  return { movements }
})
