<template>
  <main class="atelier-collection">
    <section class="collection-feature" v-if="featured">
      <img class="feature-image" :src="featured.image" :alt="featured.name" />
      <aside class="collection-index">
        <p class="section-label">The collection</p>
        <h1>Holiday goods for unhurried winters.</h1>
        <p>Fourteen capybara keepsakes, assembled to make your Christmas magical.</p>
        <strong>{{ products.length.toString().padStart(2, '0') }} Atelier pieces</strong>
      </aside>
      <article class="feature-detail">
        <p class="section-label">Featured collectible</p>
        <h2>{{ featured.name }}</h2>
        <p>{{ featured.description }}</p>
        <router-link :to="`/product/${featured.id}`" class="feature-link">View the piece</router-link>
      </article>
    </section>
    <section class="collection-grid-wrap">
      <div class="collection-heading"><h2>The holiday collection</h2><span>Demo collection · no real checkout</span></div>
      <div class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const products = computed(() => productStore.products)
const featured = computed(() => products.value[8] ?? products.value[0])
</script>
