<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="/santa-store-logo.png" alt="Santa Store Logo" />
      </router-link>
      <span class="logo-text">🎄 Santa's Workshop 🎅</span>
    </div>
    <ul class="nav-links" :class="{ 'nav-links--open': isNavOpen }">
      <li><router-link to="/orders" @click="closeNav">📦 Orders</router-link></li>
      <li><router-link to="/products" @click="closeNav">🎁 Products</router-link></li>
    </ul>
    <button class="hamburger" @click="toggleNav">
      <span class="hamburger-icon"></span>
    </button>
  </nav>
  <div class="snowflakes" aria-hidden="true">
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isNavOpen = ref(false)

function toggleNav(): void {
  isNavOpen.value = !isNavOpen.value
}

function closeNav(): void {
  isNavOpen.value = false
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 50%, #1a472a 100%);
  color: #fff;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid var(--gold-accent);
}

nav img {
  padding-right: 15px;
  width: 100px;
  height: auto;
  align-self: center;
}

.logo-text {
  background: linear-gradient(90deg, #ffffff 0%, var(--gold-accent) 50%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background-color: rgba(212, 175, 55, 0.3);
  color: var(--gold-accent);
}

.logo {
  display: flex;
  align-items: center;
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

/* Snowflakes animation */
.snowflakes {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  color: var(--accent-color);
  font-size: 1.2rem;
  opacity: 0.7;
  animation: snowfall linear infinite;
}

.snowflake:nth-child(1) { left: 5%; animation-duration: 12s; animation-delay: 0s; font-size: 1rem; }
.snowflake:nth-child(2) { left: 15%; animation-duration: 10s; animation-delay: 2s; font-size: 1.4rem; }
.snowflake:nth-child(3) { left: 30%; animation-duration: 14s; animation-delay: 4s; font-size: 0.9rem; }
.snowflake:nth-child(4) { left: 45%; animation-duration: 11s; animation-delay: 1s; font-size: 1.2rem; }
.snowflake:nth-child(5) { left: 60%; animation-duration: 13s; animation-delay: 3s; font-size: 1.1rem; }
.snowflake:nth-child(6) { left: 75%; animation-duration: 9s; animation-delay: 5s; font-size: 1.3rem; }
.snowflake:nth-child(7) { left: 85%; animation-duration: 15s; animation-delay: 2s; font-size: 1rem; }
.snowflake:nth-child(8) { left: 95%; animation-duration: 10s; animation-delay: 0s; font-size: 1.5rem; }

@keyframes snowfall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
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
