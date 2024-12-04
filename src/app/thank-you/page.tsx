'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ThankYou() {
  const searchParams = useSearchParams()

  const formData = {
    name: searchParams?.get('name') || '',
    email: searchParams?.get('email') || '',
    github_repo_url: searchParams?.get('github_repo_url') || '',
    assignment_description: searchParams?.get('assignment_description') || '',
    candidate_level: searchParams?.get('candidate_level') || ''
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-4">
      <p className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
        Thank you for submitting your assignment!
      </p>

      <div className="flex w-full max-w-lg flex-col items-center rounded-md bg-gray-100 p-5">
        <h3 className="text-lg font-bold">Submitted Data:</h3>

        <div className="mt-4 space-y-2">
          <div>
            <span className="font-medium">Name:</span> {formData.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {formData.email}
          </div>
          <div>
            <span className="font-medium">GitHub Repository URL:</span>{' '}
            <a
              href={formData.github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500"
            >
              {formData.github_repo_url}
            </a>
          </div>
          <div>
            <span className="font-medium">Assignment Description:</span>{' '}
            {formData.assignment_description}
          </div>
          <div>
            <span className="font-medium">Candidate Level:</span>{' '}
            {formData.candidate_level}
          </div>
        </div>

        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 rounded-md bg-indigo-500 p-3 text-white hover:bg-indigo-400 focus:outline-indigo-400"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou />
    </Suspense>
  )
}
