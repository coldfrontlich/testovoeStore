<template>
  <div class="cart-item">
    <img :src="imageUrl" alt="card1" class="cart-item__img" />
    <div class="cart-item__info">
      <h2 class="cart-item__h2">{{ title }}</h2>
      <span class="cart-item__span">{{ price }} ₽</span>
    </div>
    <div class="cart-item__btns">
      <button class="cart-item__btn-change" @click="subtractAmount">-</button>
      <p class="cart-item__p">{{ localAmount }}</p>
      <button class="cart-item__btn-change" @click="addAmount">+</button>
    </div>
    <button class="cart-item__btn-delete" @click="removeItem">X</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  amount: Number,
  item: Object,
})

const cartStore = useCartStore()
const localAmount = ref(props.amount)

watch(
  () => props.amount,
  (newAmount) => {
    localAmount.value = newAmount
  },
)

const addAmount = () => {
  localAmount.value += 1
  cartStore.updateAmount(props.item.id, localAmount.value)
}

const subtractAmount = () => {
  if (localAmount.value > 1) {
    localAmount.value -= 1
    cartStore.updateAmount(props.item.id, localAmount.value)
  }
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-evenly;
}
.cart-item__img {
  width: 96px;
  height: 96px;
}
.cart-item__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10rem;
  height: 4rem;
}
.cart-item__h2 {
  font-size: 16px;
  font-weight: 300;
  line-height: 112%;
  letter-spacing: 2%;
  word-wrap: break-word;
}

.cart-item__span {
  color: rgb(31, 32, 32);
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: left;
}

.cart-item__btns {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cart-item__btn-change {
  border: none;
  border-radius: 4px;
  background: rgb(242, 242, 242);
  width: 40px;
  height: 24px;
  cursor: pointer;
}

.cart-item__btn-change:hover {
  background: rgb(123, 184, 153);
}

.cart-item__p {
  margin-left: 1rem;
  margin-right: 1rem;
}

.cart-item__btn-delete {
  background-color: white;
  border: none;
  color: rgb(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
