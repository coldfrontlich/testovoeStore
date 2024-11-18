import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const selectedFilters = reactive({
    isNew: false,
    isAvailable: false,
    isContract: false,
    isExclusive: false,
    isSale: false,
  })

  const updateFilter = (key, value) => {
    if (key in selectedFilters) {
      selectedFilters[key] = value
    }
  }

  return {
    selectedFilters,
    updateFilter,
  }
})
