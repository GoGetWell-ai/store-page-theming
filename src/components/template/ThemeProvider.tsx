import React, { useEffect } from 'react'
import { useThemeStore, getThemeColors } from '@/store/themeStore'

import { THEME_ENUM } from '@/constants/theme.constant'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { mode, specialty, typography } = useThemeStore()
    const setMode = useThemeStore((state) => state.setMode)
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    // Apply theme based on specialty and mode
    useEffect(() => {
        if (window === undefined) {
            return
        }

        const root = document.documentElement
        const colors = getThemeColors(specialty)

        // Handle mode (light/dark)
        const isEnabled = mode === MODE_DARK
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)

        // Handle specialty theme
        root.classList.remove(
            'theme-default',
            'theme-organTransplant',
            'theme-cosmeticSurgery',
        )
        root.classList.add(`theme-${specialty || 'default'}`)

        // Apply CSS variables for colors
        if (colors) {
            Object.entries(colors).forEach(([key, value]) => {
                if (value) {
                    // For CSS class values (gradients, etc.), store them as data attributes
                    if (
                        typeof value === 'string' &&
                        (value.startsWith('from-') ||
                            value.startsWith('bg-') ||
                            value.startsWith('text-') ||
                            value.startsWith('hover:') ||
                            value.startsWith('border-'))
                    ) {
                        root.setAttribute(`data-${key}`, value)
                    } else {
                        root.style.setProperty(`--${key}`, value)
                    }
                }
            })
        }

        // Apply typography variables
        if (typography) {
            if (typography.fontFamily)
                root.style.setProperty('--font-family', typography.fontFamily)
            if (typography.headingSize)
                root.style.setProperty('--heading-size', typography.headingSize)
            if (typography.bodySize)
                root.style.setProperty('--body-size', typography.bodySize)
        }
    }, [mode, specialty, typography, MODE_DARK, MODE_LIGHT])

    // Check system preference for dark mode on initial load
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // Set initial mode based on system preference if not already set
        if (!mode) {
            setMode(mediaQuery.matches ? MODE_DARK : MODE_LIGHT)
        }

        // Listen for changes in system preferences
        const handleChange = (e: MediaQueryListEvent) => {
            setMode(e.matches ? MODE_DARK : MODE_LIGHT)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [mode, setMode, MODE_DARK, MODE_LIGHT])

    return <>{children}</>
}

export default ThemeProvider
