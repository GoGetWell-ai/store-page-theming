

import React from 'react'

//  This type ensures only specific strings can be used as theme names
type ThemeType = 'default' | 'theme1' | 'dark'


import { useThemeStore } from '@/store/themeStore'

const ThemeSelector: React.FC = () => {

  const { specialty, setSpecialty } = useThemeStore()

  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    setSpecialty(e.target.value as ThemeType)
  }

  return (
    <select
      value={specialty} 
      onChange={handleChange}
      className="bg-primary-mild text-black px-3 py-2 rounded-md" 
    >
      {/* 🌈 These are the options the user can pick from */}
      <option value="default">Default</option>
      <option value="theme1">Green Theme</option>
      <option value="dark">Dark Theme</option>
    </select>
  )
}

export default ThemeSelector
