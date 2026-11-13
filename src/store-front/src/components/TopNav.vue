<template>
  <nav>
    <div class="logo"><router-link to="/"><span class="brand-mark" aria-hidden="true">◒</span><span class="brand-name">Santa's Capybara Atelier</span></router-link></div>
    <button class="hamburger" type="button" :aria-expanded="isNavOpen" aria-controls="storefront-navigation" aria-label="Toggle navigation" @click="toggleNav"><span class="hamburger-icon"></span></button>
    <ul id="storefront-navigation" class="nav-links" :class="{ 'nav-links--open': isNavOpen }"><li><router-link to="/" @click="closeNav">Collection</router-link></li><li><router-link to="/cart" @click="closeNav">Demo cart ({{ cartItemCount }})</router-link></li></ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores'
const cartStore = useCartStore(); const isNavOpen = ref(false); const cartItemCount = computed(() => cartStore.count)
const toggleNav = (): void => { isNavOpen.value = !isNavOpen.value }; const closeNav = (): void => { isNavOpen.value = false }
</script>

<style scoped>
nav { display: flex; justify-content: space-between; align-items: center; background: #132718; color: #f7ead2; padding: .8rem 1.25rem; position: fixed; top: 0; left: 0; right: 0; }.logo a { display: flex; align-items: center; gap: .65rem; color: #f7ead2; }.brand-mark { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border: 1px solid #c9a764; border-radius: 50%; color: #c9a764; }.brand-name { font-family: 'DM Serif Display', Georgia, serif; font-size: clamp(1rem, 2vw, 1.45rem); font-weight: 400; }.nav-links { display: flex; gap: 1rem; list-style: none; font-size: .95rem; font-weight: 700; }.nav-links a { color: #f7ead2; }.hamburger { display: none; padding: 8px; border: 0; background: none; box-shadow: none; }.hamburger-icon, .hamburger-icon::before, .hamburger-icon::after { display: block; width: 20px; height: 2px; background: #f7ead2; }.hamburger-icon { position: relative; }.hamburger-icon::before, .hamburger-icon::after { position: absolute; left: 0; content: ''; }.hamburger-icon::before { top: -6px; }.hamburger-icon::after { top: 6px; }
@media (max-width: 768px) { .nav-links { display: none; position: absolute; top: 100%; right: 0; left: 0; padding: 1rem; background: #132718; }.nav-links--open { display: block; }.nav-links--open li + li { margin-top: .75rem; }.hamburger { display: block; } }
</style>
