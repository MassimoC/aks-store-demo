<template>
  <header class="console-header">
    <nav aria-label="Atelier Console navigation">
      <router-link class="brand" to="/orders" @click="closeNav">
        <span class="atelier-mark" aria-hidden="true">SC</span>
        <span><strong>Santa's Capybara Atelier</strong><small>Atelier Console</small></span>
      </router-link>
      <button class="hamburger" type="button" :aria-expanded="isNavOpen" aria-controls="console-navigation" aria-label="Toggle navigation" @click="toggleNav"><span aria-hidden="true">Menu</span></button>
      <ul id="console-navigation" class="nav-links" :class="{ 'nav-links--open': isNavOpen }">
        <li><router-link to="/orders" @click="closeNav">Orders</router-link></li>
        <li><router-link to="/products" @click="closeNav">Atelier collection</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isNavOpen = ref(false)
const toggleNav = (): void => { isNavOpen.value = !isNavOpen.value }
const closeNav = (): void => { isNavOpen.value = false }
</script>

<style scoped>
.console-header { position: sticky; top: 0; z-index: 10; border-bottom: 1px solid rgba(184,145,72,.42); background: rgba(20,55,42,.97); box-shadow: 0 10px 28px rgba(22,43,34,.16); }
nav { width: min(1180px, calc(100% - 32px)); min-height: 72px; margin: auto; display: flex; align-items: center; gap: 24px; }
.brand { display: inline-flex; align-items: center; gap: 11px; color: #fffaf0; text-decoration: none; margin-right: auto; }.brand strong, .brand small { display: block; }.brand strong { font-family: 'Playfair Display', Georgia, serif; font-size: 1rem; }.brand small { margin-top: 2px; color: #d9c69d; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.atelier-mark { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid #d8b56a; border-radius: 50%; color: #f6e7b4; font: 700 .7rem/1 Georgia, serif; }.nav-links { display: flex; gap: 6px; list-style: none; margin: 0; padding: 0; }.nav-links a { display: block; padding: 10px 13px; border-radius: 7px; color: #f9f1dd; text-decoration: none; font-size: .9rem; font-weight: 700; }.nav-links a:hover, .nav-links a.router-link-active { background: rgba(255,248,229,.12); color: #ffe6a0; }.hamburger { display: none; border: 1px solid rgba(255,255,255,.35); border-radius: 6px; background: transparent; color: #fffaf0; padding: 8px 10px; font: inherit; }
@media (max-width: 680px) { nav { min-height: 64px; }.hamburger { display: block; }.nav-links { display: none; position: absolute; top: 100%; right: 16px; left: 16px; padding: 8px; border: 1px solid rgba(184,145,72,.45); border-radius: 8px; background: #153e30; box-shadow: 0 12px 28px rgba(0,0,0,.2); }.nav-links--open { display: block; }.nav-links a { padding: 12px; }.brand strong { font-size: .9rem; } }
</style>
