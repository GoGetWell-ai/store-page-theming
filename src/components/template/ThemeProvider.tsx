import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import presetThemeSchemaConfig from '@/configs/theme.config'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { themeSchema, mode, specialty } = useThemeStore()

    useEffect(() => {
        const root = document.documentElement
        const theme =
            presetThemeSchemaConfig[specialty]?.[mode] ??
            presetThemeSchemaConfig.default[mode]

        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${toKebabCase(key)}`, value)
        })
    }, [themeSchema, mode, specialty])

    return <>{children}</>
}

function toKebabCase(str: string) {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

export default ThemeProvider
