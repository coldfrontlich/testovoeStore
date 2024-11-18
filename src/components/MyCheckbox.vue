<template>
  <div class="checkbox">
    <label class="checkbox__item" v-for="(option, index) in options" :key="index">
      <input
        type="checkbox"
        class="checkbox__input"
        :checked="filtersStore.selectedFilters[option.key]"
        @change="filtersStore.updateFilter(option.key, $event.target.checked)"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore'

defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const filtersStore = useFiltersStore()
</script>

<style scoped>
.checkbox {
  display: flex;
  flex-direction: column;
}
.checkbox__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.checkbox__input {
  appearance: none;
  -webkit-appearance: none;
  width: 36px;
  height: 22px;
  background-color: rgb(242, 242, 242);
  border-radius: 40px;
  position: relative;
  margin-right: 12px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
}
.checkbox__input:checked {
  background-color: rgb(123, 184, 153);
}
.checkbox__input::before {
  content: '';
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 7px;
  left: 5px;
  transition: all 0.2s;
}
.checkbox__input:checked::before {
  content: '';
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 7px;
  left: 25px;
}

@media (max-width: 700px) {
  .checkbox {
    display: none;
  }
}
</style>
