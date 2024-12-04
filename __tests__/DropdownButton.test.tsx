// import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import DropdownButton from '../src/app/components/DropdownButton'
// import '@testing-library/jest-dom' // для использования матчеров типа toBeInTheDocument
// import { jest } from '@jest/globals'

// describe('DropdownButton', () => {
//   it('should render with default text', () => {
//     const mockOnSelectLevel = jest.fn()

//     render(<DropdownButton onSelectLevel={mockOnSelectLevel} />)

//     expect(screen.getByText('Select Candidate Level')).toBeInTheDocument()
//   })

//   it('should open the dropdown when the button is clicked', async () => {
//     const mockOnSelectLevel = jest.fn()

//     render(<DropdownButton onSelectLevel={mockOnSelectLevel} />)

//     fireEvent.click(screen.getByRole('button', { name: /Select Candidate Level/i }))

//     expect(screen.getByRole('listbox')).toBeInTheDocument()
//   })

//   it('should select a level and close the dropdown', async () => {
//     const mockOnSelectLevel = jest.fn()

//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       ok: true,
//       json: async () => ({ levels: ['Junior', 'Middle', 'Senior'] }),
//     })

//     render(<DropdownButton onSelectLevel={mockOnSelectLevel} />)

//     await waitFor(() => expect(screen.getByText('Junior')).toBeInTheDocument())

//     fireEvent.click(screen.getByRole('button', { name: /Select Candidate Level/i }))

//     fireEvent.click(screen.getByText('Middle'))

//     expect(screen.getByText('Middle')).toBeInTheDocument()

//     expect(mockOnSelectLevel).toHaveBeenCalledWith('Middle')
//   })

//   it('should show loading state when fetching levels', async () => {
//     const mockOnSelectLevel = jest.fn()

//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       ok: true,
//       json: async () => new Promise((resolve) => setTimeout(() => resolve({ levels: ['Junior', 'Middle', 'Senior'] }), 1000)),
//     })

//     render(<DropdownButton onSelectLevel={mockOnSelectLevel} />)

//     expect(screen.getByText('Loading...')).toBeInTheDocument()

//     await waitFor(() => expect(screen.getByText('Junior')).toBeInTheDocument())

//     expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
//   })

//   it('should show error message when there is an error fetching levels', async () => {
//     const mockOnSelectLevel = jest.fn()

//     jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Error fetching data'))

//     render(<DropdownButton onSelectLevel={mockOnSelectLevel} />)

//     await waitFor(() => expect(screen.getByText('Error during data fetching')).toBeInTheDocument())
//   })
// })
