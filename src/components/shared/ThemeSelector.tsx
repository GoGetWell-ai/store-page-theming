import React from 'react'
import { useThemeStore } from '@/store/themeStore'

const themes = [
  { id: 'default', name: 'Default' },
  { id: 'theme1', name: 'Organ Transplant' },
  { id: 'theme2', name: 'Cosmetic Surgery' },
]

const ThemeSelector: React.FC = () => {
  const { specialty, setspecialty } = useThemeStore()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setspecialty(e.target.value as 'default' | 'theme1' | 'theme2')
  }

  return (
    <select
      value={specialty}
      onChange={handleChange}
      className="bg-white text-black px-3 py-1 rounded-md"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector
