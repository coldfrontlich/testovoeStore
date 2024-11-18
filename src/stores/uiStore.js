import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isFilterMenuOpen: false,
  }),
  actions: {
    toggleFilterMenu() {
      this.isFilterMenuOpen = !this.isFilterMenuOpen
    },
    closeFilterMenu() {
      this.isFilterMenuOpen = false
    },
  },
})
