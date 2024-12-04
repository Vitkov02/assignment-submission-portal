'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import DropdownButton from './components/DropdownButton'
import { schema } from './lib/validation'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github_repo_url: '',
    assignment_description: '',
    candidate_level: ''
  })
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))

    const { error } = schema.validate(
      { ...formData, [id]: value },
      { abortEarly: false }
    )
    if (error) {
      const errorMessages: any = {}
      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message
      })
      setErrors(errorMessages)
    } else {
      setErrors((prevErrors: { [x: string]: any }) => {
        const { [id]: _, ...rest } = prevErrors
        return rest
      })
    }
  }

  const handleSelectLevel = (level: string) => {
    setFormData((prevData) => ({ ...prevData, candidate_level: level }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = schema.validate(formData, { abortEarly: false })
    if (error) {
      const errorMessages: any = {}
      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message
      })
      setErrors(errorMessages)
      return
    }
    setErrors({})

    setLoading(true)
    try {
      const res = await fetch(
        'https://tools.qa.public.ale.ai/api/tools/candidates/assignments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      if (!res.ok) {
        throw new Error('Failed to submit')
      }

      const queryParams = new URLSearchParams(formData).toString()

      router.push(`/thank-you?${queryParams}`)
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    const isFilled = Object.values(formData).every(
      (field) => field.trim() !== ''
    )
    const hasNoErrors = Object.keys(errors).length === 0
    return isFilled && hasNoErrors
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-4">
      <p className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
        Assignment Submission Portal
      </p>
      <form
        className="flex w-full max-w-lg flex-col rounded-md bg-gray-100 p-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-sm font-medium md:text-base">
          Name
        </label>
        <input
          className={`input mb-4 rounded-md border border-gray-300 p-2 focus:outline-indigo-400 ${errors.name ? '!m-0' : ''}`}
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="mb-4 text-sm text-red-500">{errors.name}</p>
        )}

        <label htmlFor="email" className="text-sm font-medium md:text-base">
          Email
        </label>
        <input
          className={`input mb-4 rounded-md border border-gray-300 p-2 focus:outline-indigo-400 ${errors.email ? '!m-0' : ''}`}
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mb-4 text-sm text-red-500">{errors.email}</p>
        )}

        <label
          htmlFor="github_repo_url"
          className="text-sm font-medium md:text-base"
        >
          GitHub Repository URL
        </label>
        <input
          className={`input mb-4 rounded-md border border-gray-300 p-2 focus:outline-indigo-400 ${errors.github_repo_url ? '!m-0' : ''}`}
          type="text"
          id="github_repo_url"
          value={formData.github_repo_url}
          onChange={handleChange}
        />
        {errors.github_repo_url && (
          <p className="mb-4 text-sm text-red-500">{errors.github_repo_url}</p>
        )}

        <DropdownButton onSelectLevel={handleSelectLevel} />

        <label
          htmlFor="assignment_description"
          className="mt-4 text-sm font-medium md:text-base"
        >
          Assignment Description
        </label>
        <textarea
          className={`input custom-scrollbar mb-4 h-28 resize-none rounded-md border border-gray-300 p-2 focus:outline-indigo-400 ${errors.assignment_description ? '!m-0' : ''}`}
          id="assignment_description"
          value={formData.assignment_description}
          onChange={handleChange}
        ></textarea>
        {errors.assignment_description && (
          <p className="mb-4 text-sm text-red-500">
            {errors.assignment_description}
          </p>
        )}

        <button
          type="submit"
          className={`rounded-md p-3 text-white focus:outline-indigo-400 ${loading ? 'bg-indigo-500' : 'bg-indigo-500 hover:bg-indigo-400'} ${!isFormValid() || loading ? 'cursor-not-allowed bg-indigo-300 hover:bg-indigo-300' : ''} `}
          disabled={loading || !isFormValid()}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {errorMessage && (
          <p className="mb-4 mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}
