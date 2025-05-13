import { defineStore } from "pinia"

export const usePeopleGroupStore = defineStore("peopleGroup", () => {
  const peopleGroups = ref<any>(JSON.parse(localStorage.getItem("peopleGroups") || "{}"))
  function setPeopleGroups(peopleGroupValues: any) {
    peopleGroups.value = peopleGroupValues
    localStorage.setItem('peopleGroups', JSON.stringify(peopleGroupValues))
  }
  const options = computed(() => {
    return peopleGroups.value.map((pg: any) => ({ label: pg.name, value: pg.id }))
  })

  return { peopleGroups, options, setPeopleGroups }
})

