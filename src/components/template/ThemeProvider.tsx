// src/components/template/ThemeProvider.tsx
import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty, mode, direction } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement

    // Theme class
    root.className = `theme-${specialty}`

    // Dark/light mode class
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Direction (LTR/RTL)
    root.setAttribute('dir', direction)
  }, [specialty, mode, direction])

  return <>{children}</>
}

export default ThemeProvider
