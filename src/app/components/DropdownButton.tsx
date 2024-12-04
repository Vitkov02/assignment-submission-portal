import { useEffect, useState, useRef } from 'react'

interface DropdownButtonProps {
  onSelectLevel: (level: string) => void
}

const DropdownButton = ({ onSelectLevel }: DropdownButtonProps) => {
  const [levels, setLevels] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch(
          'https://tools.qa.public.ale.ai/api/tools/candidates/levels'
        )
        if (!response.ok) {
          throw new Error('Error during data fetching')
        }
        const data = await response.json()
        if (data.levels && Array.isArray(data.levels)) {
          setLevels(data.levels)
        } else {
          throw new Error('Invalid data format from API')
        }
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Invalid Error')
        }
        setLoading(false)
      }
    }

    fetchLevels()
  }, [])

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDropdownOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level)
    setIsDropdownOpen(false)
    onSelectLevel(level)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        className="focus:shadow-outline-blue mb-4 inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
        onClick={toggleDropdown}
      >
        {selectedLevel || 'Select Candidate Level'}
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-56 rounded-md border bg-white shadow-lg"
        >
          <div className="py-1">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleSelectLevel(level)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownButton
