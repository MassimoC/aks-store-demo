import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import ProductCard from '../ProductCard.vue'

describe('ProductCard', () => {
  it('marks the card as added after adding an item to the cart', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: { id: 1, name: 'Fireside Capybara Plush', price: 24, image: '/plush.png' },
      },
      global: {
        plugins: [createPinia()],
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    await wrapper.get('.add-button').trigger('click')

    expect(wrapper.classes()).toContain('product-card--added')
    expect(wrapper.get('.add-button').text()).toContain('Added to cart')
    expect(wrapper.find('.add-button svg').exists()).toBe(false)
  })
})
