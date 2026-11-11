import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TopNav from '../TopNav.vue'

const mountNavigation = () => mount(TopNav, { global: { stubs: { 'router-link': { template: '<a><slot /></a>' } } } })

describe('TopNav', () => {
  it('renders properly', () => {
    const wrapper = mountNavigation()
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.brand').exists()).toBe(true)
    expect(wrapper.find('.brand').text()).toContain('Atelier Console')
  })

  it('displays the Atelier mark', () => {
    const wrapper = mountNavigation()
    expect(wrapper.find('.atelier-mark').exists()).toBe(true)
  })

  it('contains navigation links', () => {
    const wrapper = mountNavigation()
    expect(wrapper.find('.nav-links').exists()).toBe(true)
    expect(wrapper.findAll('.nav-links li').length).toBe(2)
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Atelier Console navigation')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    const wrapper = mountNavigation()
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')
    expect(wrapper.get('.hamburger').attributes('aria-expanded')).toBe('false')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).toContain('nav-links--open')
    expect(wrapper.get('.hamburger').attributes('aria-expanded')).toBe('true')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')
  })

})
