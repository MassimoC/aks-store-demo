import { describe, expect, it } from 'vitest'
import { presentProduct } from './catalog'

describe('presentProduct', () => {
  it('presents the existing first product as the Fireside Capybara Plush without changing its API identity', () => {
    const product = {
      id: 1,
      name: "Santa Catnip's Friend",
      price: 9.99,
      description: 'Legacy description',
      image: '/catnip.jpg',
    }

    expect(presentProduct(product)).toMatchObject({
      id: 1,
      price: 9.99,
      name: 'Fireside Capybara Plush',
      image: '/products/fireside-capybara-plush.png',
    })
  })

  it('leaves an API product outside the Atelier collection unchanged', () => {
    const product = {
      id: 99,
      name: 'Unmapped product',
      price: 3,
      description: 'No presentation override',
      image: '/unknown.jpg',
    }

    expect(presentProduct(product)).toEqual(product)
  })
})
