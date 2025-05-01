import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { THEME_ENUM } from '@/constants/theme.constant'

const ThemeSelector: React.FC = () => {
    const { mode, specialty } = useThemeStore()
    const setMode = useThemeStore((state) => state.setMode)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const toggleDarkMode = () => {
        setMode(mode === MODE_DARK ? MODE_LIGHT : MODE_DARK)
    }

    return (
        <div className="flex items-center space-x-4">
            {/* Specialty Theme Selection */}
            <div className="relative">
                <select
                    value={specialty}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => {
                        setSpecialty(e.target.value as any)
                        setMode(mode)
                    }}
                >
                    <option value="default">Default Theme</option>
                    <option value="organTransplant">Organ Transplant</option>
                    <option value="cosmeticSurgery">Cosmetic Surgery</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={
                    mode === MODE_DARK
                        ? 'Switch to light mode'
                        : 'Switch to dark mode'
                }
                onClick={toggleDarkMode}
            >
                {mode === MODE_DARK ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default ThemeSelector
