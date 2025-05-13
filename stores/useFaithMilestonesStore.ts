import { defineStore } from 'pinia'

export const useFaithMilestoneStore = defineStore('faithMilestone', () => {
  const faithMilestones = ref<any>(JSON.parse(localStorage.getItem('faithMilestones') || '{}'))
  function setFaithMilestones(faithMilestoneValues: any) {
    faithMilestones.value = faithMilestoneValues
    localStorage.setItem('faithMilestones', JSON.stringify(faithMilestoneValues))
  }
  return { faithMilestones, setFaithMilestones }
})