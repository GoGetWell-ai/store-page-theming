/**
 * ThemeProvider Component
 *
 * This component is responsible for applying the current theme as a class on the document element.
 * It uses the theme store to track the current theme specialty and applies the appropriate CSS class.
 * The component updates the document element whenever the theme specialty changes.
 */

import { ReactNode, useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // Access the current theme specialty from the store
    const specialty = useThemeStore((state) => state.specialty)

    // Apply theme class when the component mounts or theme changes
    useEffect(() => {
        // Remove any existing theme classes
        document.documentElement.classList.remove(
            'theme-organTransplant',
            'theme-cosmeticSurgery',
        )

        // Apply the appropriate class based on the current specialty
        // Note: Default theme doesn't need a class since it uses :root CSS variables
        if (specialty !== 'default') {
            document.documentElement.classList.add(`theme-${specialty}`)
        }

        // Optional: Update meta theme-color for browser UI (mobile devices)
        const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]',
        )
        if (metaThemeColor) {
            if (specialty === 'organTransplant') {
                metaThemeColor.setAttribute('content', '#006064') // Teal color
            } else if (specialty === 'cosmeticSurgery') {
                metaThemeColor.setAttribute('content', '#ad1457') // Pink color
            } else {
                metaThemeColor.setAttribute('content', '#1976d2') // Default blue
            }
        }

        // Log theme change for debugging purposes
        console.log(`Theme changed to: ${specialty}`)
    }, [specialty]) // Re-run effect when specialty changes

    return <>{children}</>
}

export default ThemeProvider
