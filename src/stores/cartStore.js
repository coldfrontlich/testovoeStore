import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.amount, 0),
  )

  const addToCart = (item) => {
    const existingItem = cartItems.value.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      existingItem.amount += 1
    } else {
      cartItems.value.push({ ...item, amount: 1 })
    }
  }

  const removeFromCart = (itemId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const updateAmount = (itemId, amount) => {
    const item = cartItems.value.find((item) => item.id === itemId)
    if (item) {
      item.amount = amount
    }
  }

  return {
    cartItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    updateAmount,
  }
})
