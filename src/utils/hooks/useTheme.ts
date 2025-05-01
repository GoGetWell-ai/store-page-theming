import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'

export type ThemeVariables = Record<
    'primary' | 'primaryDeep' | 'primaryMild' | 'primarySubtle' | 'neutral',
    string
>

export interface MappedTheme {
    [key: string]: string
}

export const mapTheme = (variables: ThemeVariables): MappedTheme => {
    const theme = {
        '--primary': variables.primary || '',
        '--primary-deep': variables.primaryDeep || '',
        '--primary-mild': variables.primaryMild || '',
        '--primary-subtle': variables.primarySubtle || '',
        '--neutral': variables.neutral || '',
    }
    
    // Add additional theme variables based on primary color
    const isOrganTransplant = variables.primary === '#16a34a' || variables.primary === '#22c55e';
    const isCosmeticSurgery = variables.primary === '#db2777' || variables.primary === '#ec4899';
    
    if (isOrganTransplant) {
        // Organ Transplant theme
        return {
            ...theme,
            '--background': '#f8f9fa',
            '--card-bg': '#ffffff',
            '--text': '#1e293b',
            '--text-light': '#64748b',
            '--border': '#e2e8f0',
            '--secondary': '#64748b',
        }
    } else if (isCosmeticSurgery) {
        // Cosmetic Surgery theme
        return {
            ...theme,
            '--background': '#fdf2f8',
            '--card-bg': '#ffffff',
            '--text': '#1e1b4b',
            '--text-light': '#6b7280',
            '--border': '#f5d0fe',
            '--secondary': '#9d174d',
        }
    } else {
        // Default theme
        return {
            ...theme,
            '--background': '#ffffff',
            '--card-bg': '#ffffff',
            '--text': '#171717',
            '--text-light': '#737373',
            '--border': '#e5e5e5',
            '--secondary': '#6b7280',
        }
    }
}

function useThemeSchema() {
    const themeSchema = useThemeStore((state) => state.themeSchema)
    const mode = useThemeStore((state) => state.mode)
    const specialty = useThemeStore((state) => state.specialty)

    const applyTheme = (theme: string): void => {
        if (presetThemeSchemaConfig[theme][mode]) {
            const themeObject = mapTheme(presetThemeSchemaConfig[theme][mode])
            if (!themeObject) return

            const root = document.documentElement
            
            // Set data-theme attribute for CSS selectors based on specialty
            if (specialty !== 'default') {
                root.setAttribute('data-theme', specialty);
            } else {
                root.removeAttribute('data-theme');
            }

            // Apply CSS variables
            Object.keys(themeObject).forEach((property) => {
                if (property === 'name') {
                    return
                }

                root.style.setProperty(property, themeObject[property])
            })
            
            // Apply dark mode specific overrides
            if (mode === 'dark') {
                root.style.setProperty('--background', '#1e1e1e');
                root.style.setProperty('--card-bg', '#2d2d2d');
                root.style.setProperty('--text', '#f5f5f5');
                root.style.setProperty('--text-light', '#a3a3a3');
                root.style.setProperty('--border', '#404040');
            }
        }
    }

    useEffect(() => {
        if (themeSchema) {
            applyTheme(themeSchema)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeSchema, mode, specialty])
}

export default useThemeSchema
