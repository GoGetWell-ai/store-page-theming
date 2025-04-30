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
    { label: 'Cosmetic Surgery', value: 'cosmeticSurgery' }
  ]
  
  // Get the current theme label
  const currentThemeLabel = themeOptions.find(
    option => option.value === specialty
  )?.label || 'Default'

  // Handler for theme selection
  const handleSelectTheme = (value: string) => {
    setSpecialty(value as 'default' | 'organTransplant' | 'cosmeticSurgery')
    setIsOpen(false)
  }

  // Get theme-specific colors for the button
  const getThemeColors = () => {
    switch (specialty) {
      case 'organTransplant':
        return 'bg-teal-700 hover:bg-teal-800'
      case 'cosmeticSurgery':
        return 'bg-pink-700 hover:bg-pink-800'
      default:
        return 'bg-primary hover:bg-primary-deep'
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
            className={`flex items-center justify-center h-9 w-9 rounded-full ${getThemeColors()} text-white cursor-pointer`}
          >
            <HiOutlineColorSwatch size={18} />
          </div>
        }
      >
        <div className="px-2 py-2 w-[180px]">
          <div className="text-gray-500 px-2 mb-2 text-sm">Theme Specialty</div>
          {themeOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              eventKey={option.value}
              className={`mb-1 ${specialty === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => handleSelectTheme(option.value)}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {specialty === option.value && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="fill-current text-primary"
                  >
                    <path d="M13.3047 3.30469C13.6875 3.6875 13.6875 4.28125 13.3047 4.69531L6.69531 11.3047C6.28125 11.6875 5.6875 11.6875 5.30469 11.3047L2.30469 8.30469C1.92188 7.89062 1.92188 7.32812 2.30469 6.90625C2.71875 6.51562 3.28125 6.51562 3.69531 6.90625L6 9.21094L11.9141 3.30469C12.3281 2.92188 12.8906 2.92188 13.3047 3.30469Z" />
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