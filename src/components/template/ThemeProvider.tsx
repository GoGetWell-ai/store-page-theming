import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { specialtyThemes } from '@/configs/theme.config'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.className = ''

    Object.values(specialtyThemes).forEach(({ color }) => {
      Object.keys(color).forEach((key) => {
        root.style.removeProperty(`--${key}`)
      })
    })
    root.style.removeProperty('--font-family')

    if (specialty && specialty in specialtyThemes) {
      const { color, typography } = specialtyThemes[specialty]

      Object.entries(color).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })

      root.style.setProperty('--font-family', typography.fontFamily)
      root.classList.add(`theme-${specialty}`)
    }
  }, [specialty])

  return <>{children}</>
}

export default ThemeProvider
