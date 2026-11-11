<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <span class="brand-mark" aria-hidden="true">◒</span>
        <span class="brand-name">Santa's Capybara Atelier</span>
      </router-link>
    </div>
    <button class="hamburger" @click="toggleNav">
      <span class="hamburger-icon"></span>
    </button>
    <ul class="nav-links" :class="{ 'nav-links--open': isNavOpen }">
      <li><router-link to="/" @click="closeNav">Collection</router-link></li>
      <li>
        <router-link to="/cart" @click="closeNav">Demo cart ({{ cartItemCount }})</router-link>
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
  background: #132718;
  color: #f7ead2;
  padding: 0.8rem 1.25rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #f7ead2;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #c9a764;
  border-radius: 50%;
  color: #c9a764;
}

.brand-name {
  font-family: Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.45rem);
  font-weight: 700;
}

.nav-links {
  display: flex;
  list-style: none;
  font-size: 0.95rem;
  font-weight: 700;
  gap: 1rem;
}

.nav-links a { color: #f7ead2; }

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
    background-color: #333;
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
