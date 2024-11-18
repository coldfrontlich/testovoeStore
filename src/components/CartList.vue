<template>
  <div class="cart">
    <div class="cart__info">
      <h2 class="cart__h2">Корзина</h2>
      <button class="cart__btn-close" @click="notifyOverlayToggle">X</button>
    </div>
    <div class="cart__amount">
      <h5 class="cart__h5">{{ cartStore.cartItems.length }} товара</h5>
      <button class="cart__btn-delete" @click="clearCart">ОЧИСТИТЬ СПИСОК</button>
    </div>
    <CartItem
      v-for="cartItem in cartStore.cartItems"
      :key="cartItem.id"
      :title="cartItem.title"
      :imageUrl="cartItem.imageUrl"
      :price="cartItem.price"
      :amount="cartItem.amount"
      :item="cartItem"
    />
    <div class="cart__end">
      <div class="cart__price-list">
        <span class="cart__price">Итого</span>
        <span class="cart__price-sum">{{ cartStore.totalPrice }}₽</span>
      </div>
      <button class="cart__btn-create">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

import CartItem from './CartItem.vue'

const cartStore = useCartStore()

const clearCart = () => {
  cartStore.clearCart()
}

const emit = defineEmits(['toggle-cart-overlay'])

const notifyOverlayToggle = () => {
  emit('toggle-cart-overlay')
}
</script>

<style scoped>
.cart {
  margin: 2.5rem;
}

.cart__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}

.cart__amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
}

.cart__h2 {
  font-size: 30px;
  font-weight: 500;
  line-height: 88%;
  letter-spacing: -4%;
  text-align: left;
}

.cart__h5 {
  font-size: 14px;
  font-weight: 400;
  line-height: 112%;
  letter-spacing: 0%;
  text-align: left;
}

.cart__span {
  font-size: 14px;
  font-weight: 300;
  line-height: 112%;
  letter-spacing: 0%;
  text-align: right;
  opacity: 0.4;
}

.cart__btn-close {
  border: 1px solid rgb(0, 0, 0, 0.1);
  color: black;
  background-color: white;
  border-radius: 28px;
  width: 48px;
  height: 48px;
  cursor: pointer;
}

.cart__btn-close:hover {
  background-color: rgb(123, 184, 153);
}

.cart__btn-delete {
  border: none;
  color: black;
  opacity: 0.4;
  background-color: white;
  cursor: pointer;
}

.cart__btn-create {
  width: 14rem;
  height: 3rem;
  border-radius: 4px;
  background: rgb(123, 184, 153);
  border: none;
  cursor: pointer;
}

.cart__end {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.cart__price-list {
  display: flex;
  flex-direction: column;
}

.cart__price-sum {
  font-size: 24px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -2%;
  text-align: left;
}

@media (max-width: 500px) {
  .cart {
    margin: 1rem;
  }
}
</style>
