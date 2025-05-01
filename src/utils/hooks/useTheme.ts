import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export const useTheme = () => {
    const { colors, typography, specialtyConfig } = useThemeStore()

    useEffect(() => {
        const root = document.documentElement

        try {
            // Apply colors
            Object.entries(colors).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        root.style.setProperty(`--${key}-${subKey}`, subValue)
                    })
                } else {
                    root.style.setProperty(`--${key}`, value)
                }
            })

            // Apply typography
            if (typography?.fontFamily) {
                root.style.setProperty('--font-family', typography.fontFamily)
            }
            Object.entries(typography).forEach(([key, value]) => {
                if (key !== 'fontFamily' && typeof value === 'object') {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        root.style.setProperty(`--${key}-${subKey}`, subValue)
                    })
                }
            })

            // Apply specialty-specific styles
            if (specialtyConfig) {
                // Hero section styles
                const heroSection = specialtyConfig.heroSection
                if (heroSection) {
                    root.style.setProperty('--hero-title', heroSection.title)
                    root.style.setProperty('--hero-description', heroSection.description)
                    root.style.setProperty('--hero-cta-text', heroSection.ctaText)
                    root.style.setProperty('--hero-style', heroSection.style)
                    root.style.setProperty('--hero-layout', heroSection.layout)
                }

                // Menu bar styles
                const menuBar = specialtyConfig.menuBar
                if (menuBar) {
                    root.style.setProperty('--menu-style', menuBar.style)
                    root.style.setProperty('--menu-layout', menuBar.layout)
                    root.style.setProperty('--menu-position', menuBar.position)
                }

                // Card styles
                const cards = specialtyConfig.cards
                if (cards) {
                    root.style.setProperty('--card-style', cards.style)
                    root.style.setProperty('--card-layout', cards.layout)
                    root.style.setProperty('--card-spacing', `${cards.spacing}px`)
                    root.style.setProperty('--card-border-radius', cards.borderRadius)
                    root.style.setProperty('--card-shadow', cards.shadow)
                    root.style.setProperty('--card-hover-effect', cards.hoverEffect)
                }

                // Form styles
                const forms = specialtyConfig.forms
                if (forms) {
                    root.style.setProperty('--form-style', forms.style)
                    root.style.setProperty('--form-layout', forms.layout)
                    root.style.setProperty('--form-spacing', `${forms.spacing}px`)
                    root.style.setProperty('--form-input-style', forms.inputStyle)
                    root.style.setProperty('--form-button-style', forms.buttonStyle)
                    root.style.setProperty('--form-input-classes', forms.inputClasses)
                    root.style.setProperty('--form-label-classes', forms.labelClasses)
                }
            }
        } catch (error) {
            console.error('Error applying theme styles:', error)
        }
    }, [colors, typography, specialtyConfig])
}

export default useTheme
