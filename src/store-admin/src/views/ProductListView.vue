<template>
  <main class="page-shell">
    <header class="page-heading"><div><p class="eyebrow">Catalog management</p><h1>Atelier collection</h1><p>Curate the capybara holiday collection shown in this conference demo.</p></div><router-link class="button" to="/product/add">Add product</router-link></header>
    <section v-if="products.length" class="inventory-card" aria-label="Atelier collection inventory">
      <div class="table-header"><span>Product</span><span>Collection note</span><span>Demo price</span><span class="sr-only">Open</span></div>
      <router-link v-for="product in products" :key="product.id" class="inventory-row" :to="`/product/${product.id}`">
        <span class="product-cell"><img :src="product.image" :alt="product.name" /><span><strong>{{ product.name }}</strong><small>Product {{ product.id }}</small></span></span><span class="description">{{ product.description || 'No collection note yet.' }}</span><strong class="price">{{ formatPrice(product.price) }}</strong><span class="open">Open <span aria-hidden="true">→</span></span>
      </router-link>
    </section>
    <section v-else class="empty-state"><p class="eyebrow">Collection is empty</p><h1>Start the demo catalog</h1><p>Add the first capybara product to make the collection available for the storefront.</p><router-link class="button" to="/product/add">Add product</router-link></section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores'
const productStore = useProductStore()
const products = computed(() => productStore.products)
const formatPrice = (price: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
</script>

<style scoped>
.page-shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 72px; }.page-heading { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 30px; }.eyebrow { margin: 0 0 7px; color: var(--berry); font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }.page-heading h1, .empty-state h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 500; }.page-heading p:not(.eyebrow), .empty-state p:not(.eyebrow) { max-width: 620px; margin: 9px 0 0; color: var(--muted); line-height: 1.55; }.inventory-card { overflow: hidden; border: 1px solid var(--line); border-radius: var(--border-radius); background: var(--paper); box-shadow: var(--shadow); }.table-header, .inventory-row { display: grid; grid-template-columns: minmax(220px, 1.2fr) minmax(230px, 2fr) 110px 70px; gap: 20px; align-items: center; padding: 15px 22px; }.table-header { border-bottom: 1px solid var(--line); color: var(--muted); font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }.inventory-row { color: var(--ink); text-decoration: none; border-bottom: 1px solid #eee9de; }.inventory-row:last-child { border-bottom: 0; }.inventory-row:hover { background: #fbf5e8; }.product-cell { display: flex; align-items: center; gap: 12px; min-width: 0; }.product-cell img { flex: 0 0 auto; width: 48px; height: 48px; border-radius: 8px; object-fit: cover; }.inventory-row strong { display: block; }.inventory-row small { display: block; margin-top: 4px; color: var(--muted); }.description { overflow: hidden; color: var(--muted); line-height: 1.4; text-overflow: ellipsis; white-space: nowrap; }.price { text-align: right; }.open { color: var(--berry); font-weight: 800; text-align: right; }.empty-state { max-width: 620px; padding: 48px; border: 1px solid var(--line); border-radius: var(--border-radius); background: var(--paper); box-shadow: var(--shadow); }.empty-state .button { margin-top: 22px; }.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
@media (max-width: 760px) { .page-shell { padding-top: 30px; }.page-heading { align-items: start; flex-direction: column; }.table-header { display: none; }.inventory-row { grid-template-columns: 1fr auto; gap: 12px; padding: 15px; }.product-cell { grid-column: 1; grid-row: 1; }.description, .open { display: none; }.price { grid-column: 2; grid-row: 1; } }
</style>
