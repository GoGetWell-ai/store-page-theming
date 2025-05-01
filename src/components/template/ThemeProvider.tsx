import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { THEME_DEFAULT, THEME_ORGAN_TRANSPLANT, THEME_COSMETIC_SURGERY } from '@/constants/theme.constant'
import useTheme from '@/utils/hooks/useTheme'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { specialty } = useThemeStore()
    useTheme() // Apply theme styles

    useEffect(() => {
        // Remove all theme classes
        document.documentElement.classList.remove(
            THEME_DEFAULT,
            THEME_ORGAN_TRANSPLANT,
            THEME_COSMETIC_SURGERY
        )

        // Add the current theme class
        document.documentElement.classList.add(specialty)

        // Apply base styles
        document.documentElement.style.setProperty('--font-family', 'system-ui, sans-serif')
        document.documentElement.style.setProperty('--transition-effect', 'all 0.3s ease')
    }, [specialty])

    return <>{children}</>
}

export default ThemeProvider 