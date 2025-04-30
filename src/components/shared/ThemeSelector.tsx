import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { MedicalSpecialty } from '@/@types/theme'

const ThemeSelector: React.FC = () => {
  const { specialty, setSpecialty, mode, toggleMode } = useThemeStore()

  const themes = [
    { value: 'default', label: 'Default Theme' },
    { value: 'organTransplant', label: 'Organ Transplant' },
    { value: 'cosmeticSurgery', label: 'Cosmetic Surgery' }
  ]

  const handleChange = (value: string) => {
    setSpecialty(value as MedicalSpecialty)
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        <button
          onClick={toggleMode}
          className="p-2 rounded-full hover:bg-primaryDeep text-white"
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <select
        value={specialty}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-primaryDeep text-white px-3 py-1 rounded border border-primaryMild focus:outline-none focus:ring-2 focus:ring-primarySubtle"
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemeSelector