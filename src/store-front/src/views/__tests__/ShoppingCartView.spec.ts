import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import ShoppingCartView from '../ShoppingCartView.vue'
import { useCartStore } from '@/stores'

const mountCart = () => {
  const pinia = createPinia()
  const cartStore = useCartStore(pinia)
  cartStore.items = [{
    product: { id: 1, name: 'Fireside Capybara Plush', price: 24, image: '/products/fireside-capybara-plush.png' },
    quantity: 2,
  }]

  return mount(ShoppingCartView, {
    global: { plugins: [pinia], stubs: { RouterLink: { template: '<a><slot /></a>' } } },
  })
}

describe('ShoppingCartView', () => {
  it('presents an illustrative order with accessible item controls', () => {
    const wrapper = mountCart()

    expect(wrapper.get('.order-title').text()).toBe('Your order')
    expect(wrapper.get('.order-summary').text()).toContain('Illustrative')
    expect(wrapper.get('[aria-label="Decrease quantity for Fireside Capybara Plush"]').exists()).toBe(true)
    expect(wrapper.get('[aria-label="Remove Fireside Capybara Plush from order"]').exists()).toBe(true)
  })
})
