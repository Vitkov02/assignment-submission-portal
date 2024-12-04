import { render, screen, fireEvent } from '@testing-library/react'
import ThankYou from '../src/app/thank-you/page'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      switch (param) {
        case 'name':
          return 'John Doe'
        case 'email':
          return 'john.doe@example.com'
        case 'github_repo_url':
          return 'https://github.com/johndoe/repo'
        case 'assignment_description':
          return 'Description of the assignment'
        case 'candidate_level':
          return 'Junior'
        default:
          return ''
      }
    })
  }))
}))

describe('ThankYou Page', () => {
  it('should render the Thank You message', () => {
    render(<ThankYou />)

    expect(
      screen.getByText(/thank you for submitting your assignment!/i)
    ).toBeInTheDocument()
  })

  it('should display the submitted data correctly', () => {
    render(<ThankYou />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(
      screen.getByText('https://github.com/johndoe/repo')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Description of the assignment')
    ).toBeInTheDocument()
    expect(screen.getByText('Junior')).toBeInTheDocument()
  })

  it('should handle the Back to Home button click', () => {
    render(<ThankYou />)

    const backButton = screen.getByRole('button', { name: /back to home/i })
    fireEvent.click(backButton)

    expect(window.location.href).toBe('http://localhost/')
  })
})
