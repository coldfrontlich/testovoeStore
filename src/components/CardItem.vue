<template>
  <div class="goods__card">
    <img :src="imageUrl" alt="card1" class="card__image" />
    <h2 class="goods__h2">{{ title }}</h2>
    <div class="goods__price">
      <span class="goods__span">{{ price }} ₽</span>
      <button class="goods__btn" @click="addToCart">+</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  item: Object,
})

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.item)
}
</script>

<style scoped>
.goods__card {
  display: flex;
  flex-direction: column;
  max-width: 220px;
  margin-right: 1rem;
  border-bottom: 1px solid rgb(31, 32, 32, 0.1);
}
.goods__h2 {
  font-size: 16px;
  font-weight: 300;
  line-height: 112%;
  letter-spacing: 2%;
  text-align: left;
  margin-bottom: 1.5rem;
}
.goods__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.goods__span {
  color: rgb(31, 32, 32);
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: left;
}

.card__image {
  margin-bottom: 1rem;
}

.goods__btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  transition: all 0.3s;
}

.goods__btn:hover {
  background-color: rgb(123, 184, 153);
}

@media (max-width: 600px) {
  .goods__card {
    max-width: 150px;
  }
}
</style>
