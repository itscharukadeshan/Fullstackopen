import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import Blog from '../src/components/Blog'

describe('Blog cards', () => {
  it('renders component', () => {
    render(<Blog />)
    screen.debug()
  })
  describe('On default blogs are', () => {
    it(`renders the blog's title and author`, () => {})
    it(`not renders the blog's like and url`, () => {})
  })
  describe('On click of the show button', () => {
    it(`display the blog's likes and url`, () => {})
    it(`twice event handler receive props call twice`, () => {})
  })
})
