import React from 'react'
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'
import { useThemeStore } from '@/store/themeStore' // Ensure this is imported correctly
import type { CommonProps } from '@/@types/common'

export interface NavToggleProps extends CommonProps {
    toggled?: boolean
    toggleDarkMode?: () => void
}

const NavToggle = ({ toggled, className, toggleDarkMode }: NavToggleProps) => {
    // Example: using 'useThemeStore' inside NavToggle if needed for other purposes like theme toggling
    const { mode } = useThemeStore() // Get the current theme mode from Zustand store

    return (
        <div className={className}>
            {/* Optional: Toggle dark/light mode */}
            <div onClick={toggleDarkMode} className="cursor-pointer">
                {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
            </div>

            {/* Optionally, display current mode */}
            {/* You could use mode here for a visual indicator of the theme */}
            <div className={`text-sm mt-1 text-${mode === 'dark' ? 'white' : 'black'}`}>
                {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </div>
        </div>
    )
}

export default NavToggle
