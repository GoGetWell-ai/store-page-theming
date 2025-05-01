import { SpecialtyType, Mode } from '@/@types/theme'
import { themeVariables } from '@/configs/theme-variables.config'

export const applyThemeStyles = (specialty: SpecialtyType, mode: Mode): void => {
    if (themeVariables[specialty] && themeVariables[specialty][mode]) {
        const variables = themeVariables[specialty][mode]
        const root = document.documentElement

        // Apply color variables
        Object.keys(variables.colors).forEach((key) => {
            root.style.setProperty(`--${key}`, variables.colors[key])
        })

        // Apply typography variables
        Object.keys(variables.typography).forEach((key) => {
            root.style.setProperty(`--font-${key}`, variables.typography[key])
        })

        // Apply spacing variables
        Object.keys(variables.spacing).forEach((key) => {
            root.style.setProperty(`--spacing-${key}`, variables.spacing[key])
        })
    }
}
