import { test, expect } from '@playwright/test'

const product = { id: 1, name: 'Fireside Capybara Plush', price: 24, description: 'A capybara collectible for the conference demo.', image: '/products/fireside-capybara-plush.png' }
const order = { orderId: 'demo-001', customerId: 'showcase-host', status: 0, items: [{ productId: 1, quantity: 1, price: 24 }] }

test.beforeEach(async ({ page }) => {
  await page.route('**/api/products', (route) => route.fulfill({ json: [product] }))
  await page.route('**/api/makeline/order/fetch', (route) => route.fulfill({ json: [order] }))
})

test('shows the Atelier collection as an operable inventory view', async ({ page }) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { name: 'Atelier collection' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Fireside Capybara Plush/ })).toBeVisible()
})

test('shows demo orders with a safe review path', async ({ page }) => {
  await page.goto('/orders')
  await expect(page.getByRole('heading', { name: 'Demo orders' })).toBeVisible()
  await page.getByRole('link', { name: /demo-001/ }).click()
  await expect(page.getByRole('button', { name: 'Mark demo order complete' })).toBeVisible()
})
