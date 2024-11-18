<template>
  <header class="header">
    <div class="hamburger" @click="toggleMenu">
      ☰
    </div>
    <div>
      <img src="@/assets/icons/logo.svg" alt="logo" />
    </div>
    <div class="header__links">
      <h4 class="header__h4">ПРОДУКТЫ</h4>
      <h4 class="header__h4">ЦВЕТЫ</h4>
      <h4 class="header__h4">ВДОХНОВЕНИЕ</h4>
      <h4 class="header__h4">СОВЕТЫ</h4>
      <h4 class="header__h4">НАЙТИ МАГАЗИН</h4>
    </div>
    <div class="header__info">
      <div class="header__info-number">
        <span class="header__span-number">+7 (495) 221-77-69</span>
        <span class="header__span-call">Заказать звонок</span>
      </div>
      <div class="header__profile" @click="notifyOverlayToggle">
        <img src="@/assets/icons/search.svg" alt="search" class="header__profile-icon" />
        <img src="@/assets/icons/profile.svg" alt="profile" class="header__profile-icon" />
        <img src="@/assets/icons/heart.svg" alt="heart" class="header__profile-icon" />
        <img src="@/assets/icons/avatar.svg" alt="avatar" class="header__profile-icon" />
      </div>
      <article v-if="showCartOverlay" class="header__cart-overlay">
        <CartList :cartItems="cartStore.cartItems" @toggle-cart-overlay="notifyOverlayToggle" />
      </article>
    </div>
  </header>
</template>

<script setup>
import CartList from './CartList.vue'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore';

const cartStore = useCartStore()


const uiStore = useUIStore();

const toggleMenu = () => {
  uiStore.toggleFilterMenu();
  emit('toggle-overlay')
};

defineProps({
  showCartOverlay: Boolean,
})

const emit = defineEmits(['toggle-cart-overlay', 'toggle-overlay'])

const notifyOverlayToggle = () => {
  emit('toggle-cart-overlay')
}
</script>

<style scoped>
.header {
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 4rem;
  align-items: center;
}
.header__links {
  display: flex;
  justify-content: space-around;
}
@media (max-width: 1300px) {
  .header__links {
    display: none;
  }
}
.header__h4 {
  margin-right: 1.5rem;
}
.header__h4:last-child {
  margin-right: 0px;
}
.header__info {
  display: flex;
  justify-content: space-between;
}
.header__info-number {
  display: flex;
  flex-direction: column;
  margin-right: 7rem;
}
@media (max-width: 800px) {

  .header__info-number {
    margin-right: 2rem;
  }
}
.header__span-number {
  color: rgb(31, 32, 32);
  font-weight: 500;
  font-size: 16px;
}
.header__span-call {
  color: rgb(31, 32, 32);
  opacity: 0.3;
}
.header__profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header__profile-icon {
  width: 22px;
  height: 20px;
  margin-right: 1.5rem;
}
.header__profile-icon:last-child {
  margin-right: 0;
}

.header__cart-overlay {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

@media (max-width: 700px) {
  .header__info-number {
    display: none;
  }
  .header__profile-icon {
    display: none;
  }
  .header__profile-icon:last-child {
    display: block;
  }
}

@media (min-width: 701px) {
  .hamburger {
    display: none;
  }
}

@media (max-width: 600px) {
  .header {
    padding: 1rem;
  }
  .header__cart-overlay {
    max-width: 380px;
  }
}
</style>
