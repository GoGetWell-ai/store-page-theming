import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Initialize theme system
import { useThemeStore } from './store/themeStore'

// Pre-load the theme from localStorage
const themeStore = useThemeStore.getState()
const savedSpecialty = localStorage.getItem('theme-specialty')
const savedMode = localStorage.getItem('theme-mode')

if (savedSpecialty) {
    themeStore.setSpecialty(savedSpecialty as any)
}

if (savedMode === 'dark' || savedMode === 'light') {
    themeStore.setMode(savedMode)
}

// Listen for theme changes and save to localStorage
useThemeStore.subscribe(
    (state) => state.specialty,
    (specialty) => {
        localStorage.setItem('theme-specialty', specialty)
    }
)

useThemeStore.subscribe(
    (state) => state.mode,
    (mode) => {
        localStorage.setItem('theme-mode', mode)
    }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
