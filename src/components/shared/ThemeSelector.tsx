import { useState } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { Dropdown } from '@/components/ui'

/**
 * ThemeSelector Component
 *
 * This component provides a user interface for switching between different medical specialty themes.
 * It displays a dropdown menu with options for the Default, Organ Transplant, and Cosmetic Surgery themes.
 * The component uses the theme store to get and set the current theme.
 */
const ThemeSelector = () => {
    // Access theme store state and actions
    const specialty = useThemeStore((state) => state.specialty)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)

    // State for dropdown
    const [isOpen, setIsOpen] = useState(false)

    // Theme options with labels and values
    const themeOptions = [
        { label: 'Default', value: 'default' },
        { label: 'Organ Transplant', value: 'organTransplant' },
        { label: 'Cosmetic Surgery', value: 'cosmeticSurgery' },
    ]

    // Get the current theme label
    const currentThemeLabel =
        themeOptions.find((option) => option.value === specialty)?.label ||
        'Default'

    // Handler for theme selection
    const handleSelectTheme = (value: string) => {
        setSpecialty(value as 'default' | 'organTransplant' | 'cosmeticSurgery')
        setIsOpen(false)
    }

    // Get theme-specific gradient styles for the button
    const getThemeGradientStyles = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'bg-gradient-to-r from-teal-700 to-teal-500 hover:shadow-lg hover:from-teal-600 hover:to-teal-400'
            case 'cosmeticSurgery':
                return 'bg-gradient-to-r from-pink-700 to-pink-500 hover:shadow-lg hover:from-pink-600 hover:to-pink-400'
            default:
                return 'bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-lg hover:from-blue-600 hover:to-blue-400'
        }
    }

    return (
        <div className="theme-selector">
            <Dropdown
                isOpen={isOpen}
                placement="bottom-end"
                onToggle={() => setIsOpen(!isOpen)}
                className="mr-1"
                renderTitle={
                    <div
                        className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${getThemeGradientStyles()} text-white cursor-pointer btn-ripple`}
                    >
                        <HiOutlineColorSwatch size={18} className="animate-spin-slow" />
                    </div>
                }
            >
                <div className="px-2 py-2 w-[180px] fade-in">
                    <div className="text-gray-500 px-2 mb-2 text-sm">
                        Theme Specialty
                    </div>
                    {themeOptions.map((option) => (
                        <Dropdown.Item
                            key={option.value}
                            eventKey={option.value}
                            className={`mb-1 hover-scale ${
                                specialty === option.value 
                                ? 'bg-gray-100 dark:bg-gray-700' 
                                : ''
                            }`}
                            onClick={() => handleSelectTheme(option.value)}
                        >
                            <div className="flex items-center justify-between">
                                <span className={specialty === option.value ? 'gradient-text font-bold' : ''}>
                                    {option.label}
                                </span>
                                {specialty === option.value && (
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-primary"
                                    >
                                        <path
                                            d="M13.4 4L5.7 11.7L2.6 8.6L1.4 9.8L5.7 14.1L14.6 5.2L13.4 4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                            </div>
                        </Dropdown.Item>
                    ))}
                </div>
            </Dropdown>
        </div>
    )
}

export default ThemeSelector
