<template>
  <main class="page-shell">
    <header class="page-heading"><div><p class="eyebrow">Live demo workflow</p><h1>Demo orders</h1><p>Review submitted showcase orders and mark only the ones you have discussed as complete.</p></div><span class="count-pill">{{ orders.length }} open</span></header>
    <section v-if="hasOrders" class="orders-card" aria-label="Demo orders">
      <div class="table-header"><span>Order</span><span>Demo customer</span><span>Status</span><span>Total</span><span class="sr-only">Open</span></div>
      <router-link v-for="order in orders" :key="order.orderId" class="order-row" :to="`/order/${order.orderId}`"><strong>#{{ order.orderId }}</strong><span>{{ order.customerId }}</span><span class="status" :class="order.status === 0 ? 'pending' : 'completed'">{{ order.status === 0 ? 'Needs review' : 'Completed' }}</span><strong class="total">{{ formatPrice(orderTotal(order)) }}</strong><span class="open">Review <span aria-hidden="true">→</span></span></router-link>
    </section>
    <section v-else-if="orderStore.initialized" class="empty-state"><p class="eyebrow">All clear</p><h1>No demo orders yet</h1><p>New showcase orders will appear here as they are submitted.</p></section>
    <section v-else class="empty-state" aria-live="polite"><p class="eyebrow">Loading</p><h1>Fetching demo orders</h1><p>Connecting to the order service…</p></section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores'
import type { Order } from '@/types'
const orderStore = useOrderStore()
const orders = computed(() => orderStore.orders)
const hasOrders = computed(() => orders.value.length > 0)
const orderTotal = (order: Order): number => order.items.reduce((total, item) => total + item.quantity * item.price, 0)
const formatPrice = (price: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
</script>

<style scoped>
.page-shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 72px; }.page-heading { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 30px; }.eyebrow { margin: 0 0 7px; color: var(--berry); font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }.page-heading h1, .empty-state h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 500; }.page-heading p:not(.eyebrow), .empty-state p:not(.eyebrow) { max-width: 620px; margin: 9px 0 0; color: var(--muted); line-height: 1.55; }.count-pill { padding: 8px 11px; border: 1px solid #d9c99e; border-radius: 999px; background: #fcf5df; color: #735d2d; font-size: .8rem; font-weight: 800; white-space: nowrap; }.orders-card { overflow: hidden; border: 1px solid var(--line); border-radius: var(--border-radius); background: var(--paper); box-shadow: var(--shadow); }.table-header, .order-row { display: grid; grid-template-columns: 1fr 1.4fr 1fr 110px 70px; gap: 20px; align-items: center; padding: 16px 22px; }.table-header { border-bottom: 1px solid var(--line); color: var(--muted); font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }.order-row { color: var(--ink); text-decoration: none; border-bottom: 1px solid #eee9de; }.order-row:last-child { border-bottom: 0; }.order-row:hover { background: #fbf5e8; }.status { width: fit-content; padding: 5px 8px; border-radius: 999px; font-size: .76rem; font-weight: 800; }.pending { background: #fce8cf; color: #885107; }.completed { background: #ddefda; color: #28573a; }.total, .open { text-align: right; }.open { color: var(--berry); font-weight: 800; }.empty-state { max-width: 620px; padding: 48px; border: 1px solid var(--line); border-radius: var(--border-radius); background: var(--paper); box-shadow: var(--shadow); }.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
@media (max-width: 720px) { .page-shell { padding-top: 30px; }.page-heading { align-items: start; flex-direction: column; }.table-header { display: none; }.order-row { grid-template-columns: 1fr auto; padding: 16px; }.order-row > :nth-child(2), .open { display: none; }.status { grid-column: 1; grid-row: 2; }.total { grid-column: 2; grid-row: 1; } }
</style>
