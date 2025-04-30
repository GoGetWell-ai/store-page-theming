import React from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeSelector: React.FC = () => {
    const { specialty, setSpecialty } = useThemeStore()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSpecialty(e.target.value as 'default' | 'theme1' | 'theme2')
    }

    return (
        <select
            value={specialty}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-white text-black"
        >
            <option value="default">Default Theme</option>
            <option value="theme1">Organ Transplant</option>
            <option value="theme2">Cosmetic Surgery</option>
        </select>
    )
}

export default ThemeSelector
