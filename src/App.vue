<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import axios from 'axios'
import { useFiltersStore } from './stores/filtersStore'
import { useUIStore } from './stores/uiStore'
import HeaderComponent from '@/components/HeaderComponent.vue'
import CardList from '@/components/CardList.vue'
import MySlider from '@/components/MySlider.vue'
import MyCheckbox from '@/components/MyCheckbox.vue'
import MySelect from './components/MySelect.vue'
import MyCheckboxLow from './components/MyCheckboxLow.vue'

const filtersStore = useFiltersStore()
const uiStore = useUIStore()

const items = ref([])
const showOverlay = ref(false)
const showCartOverlay = ref(false)
const selectedOption = ref('expensive')

const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://dcb9359cd55e9548.mokky.dev/items')
    items.value = data.map((obj) => ({
      ...obj,
    }))
  } catch (error) {
    console.log(error)
  }
}

const closeOverlay = () => {
  showOverlay.value = false
  showCartOverlay.value = false
  uiStore.closeFilterMenu()
}

const toggleOverlay = () => {
  showOverlay.value = !showOverlay.value
}

const toggleCartOverlay = () => {
  showCartOverlay.value = !showCartOverlay.value
}

onMounted(async () => {
  await fetchItems()
})

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    return (
      (!filtersStore.selectedFilters.isNew || item.isNew) &&
      (!filtersStore.selectedFilters.isAvailable || item.isAvailable) &&
      (!filtersStore.selectedFilters.isContract || item.isContract) &&
      (!filtersStore.selectedFilters.isExclusive || item.isExclusive) &&
      (!filtersStore.selectedFilters.isSale || item.isSale)
    )
  })
})

const sortedItems = computed(() => {
  let sorted = [...filteredItems.value]

  switch (selectedOption.value) {
    case 'expensive':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'cheap':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'popular':
      sorted.sort((a, b) => (b.isPopular ? 1 : -1))
      break
    case 'new':
      sorted.sort((a, b) => (b.isNew ? 1 : -1))
      break
  }

  return sorted
})

const toggleFilterMenu = () => {
  uiStore.isFilterMenuOpen = !uiStore.isFilterMenuOpen;
  toggleOverlay()
};

watch(showCartOverlay, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : ''
})
</script>

<template>
  <div v-if="showOverlay || showCartOverlay" class="overlay" @click="closeOverlay"></div>
  <HeaderComponent
  @toggle-overlay="toggleOverlay"
  @toggle-cart-overlay="toggleCartOverlay" :show-cart-overlay="showCartOverlay" />
  <MySlider />
  <main class="main">
    <div
      :class="['overlay-menu', { active: uiStore.isFilterMenuOpen }]"
      @click="closeOverlay"
    >
      <MyCheckboxLow
        :options="[
          { label: 'Новинки', key: 'isNew' },
          { label: 'Есть в наличии', key: 'isAvailable' },
          { label: 'Контрактные', key: 'isContract' },
          { label: 'Эксклюзивные', key: 'isExclusive' },
          { label: 'Распродажа', key: 'isSale' },
        ]"
      />
    </div>
    <MyCheckbox
      :options="[
        { label: 'Новинки', key: 'isNew' },
        { label: 'Есть в наличии', key: 'isAvailable' },
        { label: 'Контрактные', key: 'isContract' },
        { label: 'Эксклюзивные', key: 'isExclusive' },
        { label: 'Распродажа', key: 'isSale' },
      ]"
    />
    <div class="shop">
      <div class="shop__info">
        <h5 class="count">{{ sortedItems.length }} Товаров</h5>
        <h5 class="count-filters" @click="toggleFilterMenu">ФИЛЬТРЫ</h5>
        <MySelect
          v-model="selectedOption"
          :isOverlayActive="showOverlay"
          @toggle-overlay="toggleOverlay"
          @close-overlay="closeOverlay"
        />
      </div>
      <CardList :items="sortedItems" />
    </div>
  </main>
  <footer class="footer"></footer>
</template>

<style scoped>
.overlay-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.overlay-menu.active {
  transform: translateY(0);
}

.main {
  display: flex;
  justify-content: space-evenly;
  margin-top: 5rem;
  margin-bottom: 8rem;
}

.shop {
  display: flex;
  flex-direction: column;
}
.shop__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer {
  background-color: black;
  height: 320px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

@media (max-width: 1230px) {
  .main {
    justify-content: space-around;
  }
}

@media (max-width: 800px) {
  .main {
    margin-top: 0;
  }
}

@media (max-width: 700px) {
  .count {
    display: none;
  }
}

@media (min-width: 701px) {
  .count-filters {
    display: none;
  }
}
</style>
