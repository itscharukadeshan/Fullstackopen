import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import Blog from '../../src/components/Blog'

const mockToken = 'mockToken'

describe('Blog cards', () => {
  it('renders component', () => {
    render(<Blog />)
    const component = screen.getByTestId('blog-component')
    expect(component).toBeInTheDocument()
  })

  describe('On default blogs are', () => {
    it(`renders the blog's title and author`, () => {
      const sampleBlogs = [
        {
          id: 1,
          title: 'Blog 1',
          author: 'Author 1',
          likes: 0,
          url: 'https://example.com',
        },
        {
          id: 2,
          title: 'Blog 2',
          author: 'Author 2',
          likes: 0,
          url: 'https://example.com',
        },
      ]
      render(<Blog blogs={sampleBlogs} />)
      const blogTitleElement = screen.getByText('Blog 1')
      const blogAuthorElement = screen.getByText('Author 1')
      expect(blogTitleElement).toBeInTheDocument()
      expect(blogAuthorElement).toBeInTheDocument()
    })

    it(`does not render the blog's like and url`, () => {
      const sampleBlogs = [
        {
          id: 1,
          title: 'Blog 1',
          author: 'Author 1',
          likes: 0,
          url: 'https://example.com',
        },
        {
          id: 2,
          title: 'Blog 2',
          author: 'Author 2',
          likes: 0,
          url: 'https://example.com',
        },
      ]
      render(<Blog token={mockToken} blogs={sampleBlogs} />)
      const blogLikesElement = screen.queryByText('Likes 0')
      const blogUrlElement = screen.queryByText('https://example.com')
      expect(blogLikesElement).toBeNull()
      expect(blogUrlElement).toBeNull()
    })
  })

  describe('On click of the show button', () => {
    it(`displays the blog's likes and url`, () => {
      const sampleBlogs = [
        {
          id: 1,
          title: 'Blog 1',
          author: 'Author 1',
          likes: 0,
          url: 'https://example.com',
        },
        {
          id: 2,
          title: 'Blog 2',
          author: 'Author 2',
          likes: 0,
          url: 'https://example.com',
        },
      ]
      render(<Blog token={mockToken} blogs={sampleBlogs} />)
      const showButton = screen.getByText('Show')
      fireEvent.click(showButton)
      const blogLikesElement = screen.getByText('Likes 0')
      const blogUrlElement = screen.getByText('https://example.com')
      expect(blogLikesElement).toBeInTheDocument()
      expect(blogUrlElement).toBeInTheDocument()
    })

    it(`calls the event handler twice when clicked twice`, () => {
      const sampleBlogs = [
        {
          id: 1,
          title: 'Blog 1',
          author: 'Author 1',
          likes: 0,
          url: 'https://example.com',
        },
        {
          id: 2,
          title: 'Blog 2',
          author: 'Author 2',
          likes: 0,
          url: 'https://example.com',
        },
      ]
      const eventHandlerMock = vi.fn()
      render(
        <Blog token={mockToken} blogs={sampleBlogs} onShow={eventHandlerMock} />
      )
      const showButton = screen.getByText('Show')
      fireEvent.click(showButton)
      fireEvent.click(showButton)
      expect(eventHandlerMock).toHaveBeenCalledTimes(2)
    })
  })
})
