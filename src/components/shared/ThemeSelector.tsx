import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Medicaltheme} from '@/@types/theme'

const ThemeSelector: React.FC = () => {
  const { specialty, setTheme, mode } = useThemeStore()

  const themes = [
    { value: 'default', label: 'Default Theme' },
    { value: 'organTransplant', label: 'Organ Transplant' },
    { value: 'cosmeticSurgery', label: 'Cosmetic Surgery' }
  ]

  const handleChange = (value: string) => {
    setTheme(value as Medicaltheme)
  }

  return (
    <div className="flex items-center space-x-4">
      
      <select
        value={specialty}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-primaryDeep text-black px-3 py-1 rounded border border-primaryMild 
  focus:outline-none focus:ring-2 focus:ring-primarySubtle 
  font-semibold tracking-wide text-sm shadow-sm hover:shadow-md transition-all duration-200"
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