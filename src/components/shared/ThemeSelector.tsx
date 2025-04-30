import React from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeSelector: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore()

  const handleThemeChange = (theme: 'default' | 'theme1' | 'theme2') => {
    setSpecialty(theme)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2 sm:gap-0 mt-2 sm:mt-0">
      <button
        onClick={() => handleThemeChange('default')}
        className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
          specialty === 'default' ? 'bg-primary-deep text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        Default
      </button>
      <button
        onClick={() => handleThemeChange('theme1')}
        className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
          specialty === 'theme1' ? 'bg-primary-deep text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => handleThemeChange('theme2')}
        className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
          specialty === 'theme2' ? 'bg-primary-deep text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        Cosmetic Surgery
      </button>
    </div>
  )
}

export default ThemeSelector
