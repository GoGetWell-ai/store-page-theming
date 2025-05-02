import React, { useEffect } from 'react'


import { useThemeStore } from '@/store/themeStore'

// This component wraps your whole app and applies the current theme class to <body>
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Access the current selected theme from Zustand store (e.g., 'default', 'theme1', 'dark')
    const { specialty } = useThemeStore()

    // Whenever the theme (`specialty`) changes, this effect runs
    useEffect(() => {
      
        document.body.classList.remove('default', 'theme1',  'dark')


        document.body.classList.add(specialty)
    }, [specialty]) // This effect re-runs only if `specialty` value changes


    return <>{children}</>
}

export default ThemeProvider
