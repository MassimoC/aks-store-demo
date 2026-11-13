<template>
  <div class="product-card" :class="{ 'product-card--added': justAdded }">
    <router-link class="product-link" :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.name" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
    </router-link>
    <div class="product-details">
      <div class="product-price">
        <p class="price">${{ product.price.toFixed(2) }}</p>
      </div>
      <div class="product-controls">
        <input type="number" v-model="quantity" min="1" class="quantity-input" />
        <button class="add-button" :class="{ 'add-button--confirmed': justAdded }" type="button" :aria-live="justAdded ? 'polite' : undefined" @click="addToCart">
          {{ justAdded ? 'Added to cart' : 'Add to cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useProductStore, useCartStore } from '@/stores'
import type { Product, CartItem } from '@/types'

const productStore = useProductStore()
const cartStore = useCartStore()

const props = defineProps<{
  product: Product
}>()

const product = ref<Product>(props.product)

const quantity = ref(1)
const justAdded = ref(false)
let confirmationTimer: ReturnType<typeof setTimeout> | undefined

const addToCart = () => {
  const cartItem: CartItem = {
    product: product.value,
    quantity: quantity.value,
  }
  cartStore.addItem(cartItem)
  justAdded.value = true
  if (confirmationTimer) clearTimeout(confirmationTimer)
  confirmationTimer = setTimeout(() => { justAdded.value = false }, 1700)
}

onMounted(() => {
  const fetchedProduct = productStore.products.find((p: Product) => p.id == props.product.id)
  if (fetchedProduct) {
    product.value = fetchedProduct
  }
})

onBeforeUnmount(() => {
  if (confirmationTimer) clearTimeout(confirmationTimer)
})
</script>

<style scoped>
.product-link { display: block; color: inherit; text-decoration: none; }.product-link:focus-visible { outline: 3px solid #d4b36d; outline-offset: -5px; }.add-button { min-width: 112px; padding-inline: .85rem; }.product-card--added { border-color: #719470; box-shadow: 0 18px 38px rgba(40,91,62,.2); animation: card-confirmation .55s cubic-bezier(.2,.8,.2,1); }.add-button--confirmed { background: #285b3e; box-shadow: 0 7px 16px rgba(40,91,62,.26); animation: confirmation-pop .42s cubic-bezier(.2,.8,.2,1); }
@keyframes confirmation-pop { 0% { transform: scale(.94); } 65% { transform: scale(1.045); } 100% { transform: scale(1); } } @keyframes card-confirmation { 0% { transform: translateY(0); } 45% { transform: translateY(-7px); } 100% { transform: translateY(-5px); } }
@media (prefers-reduced-motion: reduce) { .add-button--confirmed { animation: none; } }
</style>
