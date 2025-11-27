<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <div class="logo-container">
          <img src="/santa-store-logo.png" alt="Santa Pet Store Logo" />
          <div class="santa-hat"></div>
        </div>
      </router-link>
    </div>
    <button class="hamburger" @click="toggleNav">
      <span class="hamburger-icon"></span>
    </button>
    <ul class="nav-links" :class="{ 'nav-links--open': isNavOpen }">
      <li><router-link to="/" @click="closeNav">Products</router-link></li>
      <li>
        <router-link to="/cart" @click="closeNav">Cart ({{ cartItemCount }})</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores'

const cartStore = useCartStore()
const isNavOpen = ref(false)

const cartItemCount = computed(() => cartStore.count)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8B0000;
  color: #fff;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.25rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.logo-container {
  position: relative;
  display: inline-block;
}

nav img {
  width: 100px;
  height: auto;
}

.santa-hat {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 25px solid #c41e3a;
}

.santa-hat::before {
  content: '';
  position: absolute;
  top: 22px;
  left: -25px;
  width: 50px;
  height: 8px;
  background: white;
  border-radius: 4px;
}

.santa-hat::after {
  content: '';
  position: absolute;
  top: -8px;
  left: -5px;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  list-style: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-top: -40px;
}

.hamburger-icon {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #fff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  display: block;
  width: 20px;
  height: 2px;
  background-color: #fff;
  position: absolute;
  left: 0;
}

.hamburger-icon::before {
  top: -6px;
}

.hamburger-icon::after {
  bottom: -6px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #8B0000;
    padding: 1rem;
  }

  .nav-links--open {
    display: block;
  }

  .nav-links--open li {
    padding: 0.5rem 0;
  }

  .hamburger {
    display: block;
  }
}
</style>
