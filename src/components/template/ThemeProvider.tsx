import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import type { CommonProps } from '@/@types/common'
import { applyThemeStyles } from '@/utils/applyThemeStyles'

const ThemeProvider: React.FC<CommonProps> = ({ children }) => {
    const { specialty, mode } = useThemeStore()
    
    useEffect(() => {
        // Apply CSS class based on selected theme
        document.documentElement.className = `theme-${specialty}`
        
        // Apply theme styles
        applyThemeStyles(specialty, mode)
    }, [specialty, mode])
    
    return <>{children}</>
}

export default ThemeProvider
