import Home from '../src/app/page'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as nextRouter from 'next/navigation'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn()
}))

const mockPush: jest.Mock = jest.fn()
describe('Home', () => {
  it('should render form with all fields', () => {
    ;(nextRouter.useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
      pathname: '/some/path'
    })

    render(<Home />)

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/GitHub Repository URL/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Assignment Description/i)).toBeInTheDocument()
  })

  // it('should show validation errors when fields are empty and form is submitted', async () => {
  //   render(<Home />)

  //   fireEvent.click(screen.getByRole('button', { name: /Submit/i }))

  //   expect(await screen.findByText(/Name is required/i)).toBeInTheDocument()
  //   expect(await screen.findByText(/Email is required/i)).toBeInTheDocument()
  //   expect(await screen.findByText(/GitHub is required/i)).toBeInTheDocument()
  //   expect(await screen.findByText(/Assignment is required/i)).toBeInTheDocument()

  //   expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled()
  // })

  // it('should display error message if email is invalid', async () => {
  //   render(<Home />)

  //   fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'email must be valid' } })

  //   fireEvent.click(screen.getByRole('button', { name: /Submit/i }))

  //   expect(await screen.findByText(/email must be valid/i)).toBeInTheDocument()
  // })

  it('should make an API call with correct data upon form submission', async () => {
    render(<Home />)

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/GitHub Repository URL/i), {
      target: { value: 'https://github.com/johndoe/repo' }
    })
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), {
      target: { value: 'This is a description.' }
    })

    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Success' })
    })
    global.fetch = mockFetch

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        'https://tools.qa.public.ale.ai/api/tools/candidates/assignments',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john.doe@example.com',
            github_repo_url: 'https://github.com/johndoe/repo',
            assignment_description: 'This is a description.',
            candidate_level: 'Junior'
          })
        })
      )
    )

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})
