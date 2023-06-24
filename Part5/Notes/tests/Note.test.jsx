import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Note from '../src/components/Note'

describe('Note component handle data display correctly', () => {
  it('renders content', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    }
    render(<Note note={note} />)

    const element = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()
  })
  it('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    }
    const mockHandler = jest.fn()

    render(<Note note={note} toggleImportance={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
