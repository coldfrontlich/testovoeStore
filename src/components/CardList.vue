<template>
  <div class="goods">
    <CardItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :item="item"
    />
  </div>
</template>

<script setup>
import CardItem from './CardItem.vue'
defineProps({
  items: Array,
})
</script>

<style scoped>
.goods {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 3rem;
}

@media (max-width: 1500px) {
  .goods {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 1230px) {
  .goods {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 990px) {
  .goods {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
