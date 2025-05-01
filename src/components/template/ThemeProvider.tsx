import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty } = useThemeStore()
  
  useEffect(() => {
    
    document.documentElement.className = `theme-${specialty}`
    

    document.documentElement.style.setProperty('--font-family', 
      specialty === 'organTransplant' ? 'Montserrat, sans-serif' : 
      specialty === 'cosmeticSurgery' ? 'Playfair Display, serif' : 
      'Inter, sans-serif'
    )
  }, [specialty])
  
  return <>{children}</>
}

export default ThemeProvider