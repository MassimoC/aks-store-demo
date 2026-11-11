<template>
  <main class="page-shell" v-if="productExists">
    <router-link class="back-link" to="/products">← Back to collection</router-link>
    <section class="product-detail"><figure><img :src="product?.image" :alt="product?.name" /></figure><div class="product-info"><p class="eyebrow">Atelier product {{ product?.id }}</p><h1>{{ product?.name }}</h1><p class="price">{{ formatPrice(Number(product?.price)) }}</p><p class="description">{{ product?.description }}</p><dl><div><dt>Demo role</dt><dd>Conference collection item</dd></div><div><dt>Keywords</dt><dd>{{ product?.tags || 'Not tagged' }}</dd></div></dl><router-link class="button" :to="`/product/${productId}/edit`">Edit product</router-link></div></section>
  </main>
  <main v-else class="empty-state"><p class="eyebrow">Product unavailable</p><h1>We could not find this catalog item</h1><router-link class="button" to="/products">Return to collection</router-link></main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores'
const productStore = useProductStore(); const route = useRoute(); const productId = computed(() => route.params.id as string)
const product = computed(() => productStore.products.find((candidate) => candidate.id == productId.value)); const productExists = computed(() => !!product.value)
const formatPrice = (price: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
</script>

<style scoped>
.page-shell, .empty-state { width: min(1100px, calc(100% - 32px)); margin: 0 auto; padding: 40px 0 72px; }.back-link { color: var(--berry); font-size: .9rem; font-weight: 800; text-decoration: none; }.product-detail { display: grid; grid-template-columns: minmax(280px, .9fr) minmax(330px, 1.1fr); gap: clamp(30px, 7vw, 90px); align-items: center; margin-top: 28px; }.product-detail figure { margin: 0; overflow: hidden; border-radius: 14px; background: #e6dfcf; box-shadow: var(--shadow); }.product-detail img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }.eyebrow { margin: 0 0 8px; color: var(--berry); font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }.product-info h1, .empty-state h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2.25rem, 5vw, 4rem); font-weight: 500; line-height: 1.03; }.price { margin: 14px 0 24px; color: var(--pine); font-size: 1.35rem; font-weight: 800; }.description { color: var(--muted); font-size: 1.05rem; line-height: 1.7; }.product-info dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 28px 0; }.product-info dl div { padding: 12px 0; border-top: 1px solid var(--line); }.product-info dt { color: var(--muted); font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }.product-info dd { margin: 6px 0 0; line-height: 1.4; }.empty-state { max-width: 700px; }.empty-state .button { margin-top: 18px; }
@media (max-width: 720px) { .page-shell { padding-top: 28px; }.product-detail { grid-template-columns: 1fr; }.product-info h1 { font-size: 2.5rem; } }
</style>
