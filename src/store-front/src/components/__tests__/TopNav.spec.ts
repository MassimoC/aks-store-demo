import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import TopNav from '../TopNav.vue'

const mountNav = () =>
  mount(TopNav, {
    global: {
      plugins: [createPinia()],
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a :data-to="to"><slot /></a>',
        },
      },
    },
  })

describe('TopNav', () => {
  it('renders properly', () => {
    const wrapper = mountNav()
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.logo').exists()).toBe(true)
    expect(wrapper.find('.logo').text()).toContain("Santa's Capybara Atelier")
  })

  it('contains navigation links', () => {
    const wrapper = mountNav()
    expect(wrapper.find('.nav-links').exists()).toBe(true)
    expect(wrapper.findAll('.nav-links li').length).toBe(2)
    expect(wrapper.findAll('.nav-links a').at(0)?.attributes('data-to')).toBe('/')
    expect(wrapper.findAll('.nav-links a').at(1)?.attributes('data-to')).toBe('/cart')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    const wrapper = mountNav()
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).toContain('nav-links--open')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')
  })
})
