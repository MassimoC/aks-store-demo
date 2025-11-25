import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TopNav from '../TopNav.vue'

describe('TopNav', () => {
  it('renders properly', () => {
    const wrapper = mount(TopNav)
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.logo').exists()).toBe(true)
    expect(wrapper.find('.logo-text').text()).toContain("Santa's Workshop")
  })

  it('contains navigation links', () => {
    const wrapper = mount(TopNav)
    expect(wrapper.find('.nav-links').exists()).toBe(true)
    expect(wrapper.findAll('.nav-links li').length).toBe(2)
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    const wrapper = mount(TopNav)
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).toContain('nav-links--open')

    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.find('.nav-links').classes()).not.toContain('nav-links--open')
  })

  it('displays snowflakes for Christmas theme', () => {
    const wrapper = mount(TopNav)
    expect(wrapper.find('.snowflakes').exists()).toBe(true)
    expect(wrapper.findAll('.snowflake').length).toBe(8)
  })
})
