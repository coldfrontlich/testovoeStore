import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSortStore = defineStore('sort', () => {
  const selectedOption = ref('expensive')

  const updateSortOption = (newOption) => {
    selectedOption.value = newOption
  }

  return {
    selectedOption,
    updateSortOption,
  }
})
