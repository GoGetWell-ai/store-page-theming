import React from 'react'
import { useThemeStore } from '@/store/themeStore'

const themes = [
    {
        key: 'default',
        name: 'Default Theme',
        description: 'Clean and balanced interface for general use.',
    },
    {
        key: 'theme1',
        name: 'Organ Transplant',
        description: 'Serious and professional theme with trust-oriented design.',
    },
    {
        key: 'theme2',
        name: 'Cosmetic Surgery',
        description: 'Modern and elegant theme with beauty-focused layout.',
    },
] as const

type ThemeKey = typeof themes[number]['key']

const ThemesPage: React.FC = () => {
    const { specialty, setspecialty } = useThemeStore()

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Select a Theme</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {themes.map((theme) => (
                    <div
                        key={theme.key}
                        className={`border rounded-xl p-6 shadow-md transition-all duration-300 
                            ${specialty === theme.key ? 'border-primary bg-primary-mild' : 'border-gray-300 bg-white'}`}
                    >
                        <h2 className="text-xl font-semibold mb-2">{theme.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{theme.description}</p>
                        <button
                            onClick={() => setspecialty(theme.key as ThemeKey)}
                            className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                                specialty === theme.key ? 'bg-primary-deep' : 'bg-primary hover:bg-primary-deep'
                            }`}
                        >
                            {specialty === theme.key ? 'Selected' : 'Select Theme'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ThemesPage