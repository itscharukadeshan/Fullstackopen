import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

describe('Create form', () => {
  it('receive correct props', () => {
    const token = 'exampleToken123'
    render(<CreateForm token={token} />)
    const createFormComponent = screen.getByTestId('create-form-component')
    expect(createFormComponent.props.token).toBe(token)
  })
})
