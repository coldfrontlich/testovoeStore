<template>
  <select
    class="custom-select"
    v-model="sortStore.selectedOption"
    @mousedown="notifyOverlayToggle"
    :class="{ active: isOverlayActive }"
  >
    <option value="expensive">СНАЧАЛА ДОРОГИЕ</option>
    <option value="cheap">СНАЧАЛА НЕДОРОГИЕ</option>
    <option value="popular">СНАЧАЛА ПОПУЛЯРНЫЕ</option>
    <option value="new">СНАЧАЛА НОВЫЕ</option>
  </select>
</template>

<script setup>
import { watch } from 'vue'
import { useSortStore } from '@/stores/sortStore';

const sortStore = useSortStore()

defineProps({
  isOverlayActive: Boolean,
})

const emit = defineEmits(['toggle-overlay', 'close-overlay'])

const notifyOverlayToggle = () => {
  emit('toggle-overlay')
}

watch(
  () => sortStore.selectedOption,
  () => {
    emit('close-overlay')
  }
)
</script>

<style scoped>
.custom-select {
  max-width: 17.5rem;
  padding: 8px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 12px;
  line-height: 15px;
  text-align: left;
  background-color: white;
  border: none;
  outline: none;
  transition: all 0.3s;
}
.custom-select option {
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 6%;
  text-align: left;
  background-color: white;
  border: none;
}
.custom-select.active {
  background-color: rgb(123, 184, 153);
}
.custom-select:hover {
  background-color: rgb(123, 184, 153);
}
</style>
