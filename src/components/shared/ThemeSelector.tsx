import type { SpecialtyType } from '@/@types/theme'
import { Button, Dropdown } from '@/components/ui'
import { useThemeStore } from '@/store/themeStore'
import React from 'react'

const ThemeSelector: React.FC = () => {
    const { specialty, setSpecialty } = useThemeStore()

    const themes: {
        label: string
        value: SpecialtyType
        description: string
    }[] = [
        {
            label: 'Default',
            value: 'default',
            description: 'Standard medical interface with blue accents',
        },
        {
            label: 'Organ Transplant',
            value: 'organ-transplant',
            description: 'Specialized theme for organ transplant services',
        },
        {
            label: 'Cosmetic Surgery',
            value: 'cosmetic-surgery',
            description: 'Elegant theme for cosmetic and plastic surgery',
        },
    ]

    const handleThemeChange = (value: SpecialtyType) => {
        setSpecialty(value)
    }

    const getActiveTheme = () => {
        return (
            themes.find((theme) => theme.value === specialty)?.label ||
            'Default'
        )
    }

    return (
        <Dropdown
            placement="bottom-end"
            renderTitle={
                <Button
                    variant="plain"
                    size="sm"
                    icon={
                        <span className="text-lg">
                            {specialty === 'default' && '🔵'}
                            {specialty === 'organ-transplant' && '🟢'}
                            {specialty === 'cosmetic-surgery' && '🟣'}
                        </span>
                    }
                >
                    {getActiveTheme()}
                </Button>
            }
        >
            {themes.map((theme) => (
                <Dropdown.Item
                    key={theme.value}
                    eventKey={theme.value}
                    className={`${specialty === theme.value ? 'bg-primary-subtle' : ''} mb-2`}
                    onClick={() => handleThemeChange(theme.value)}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-lg">
                            {theme.value === 'default' && '🔵'}
                            {theme.value === 'organ-transplant' && '🟢'}
                            {theme.value === 'cosmetic-surgery' && '🟣'}
                        </span>
                        <div>
                            <div className="font-semibold">{theme.label}</div>
                            <div className="text-xs text-gray-500">
                                {theme.description}
                            </div>
                        </div>
                    </div>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ThemeSelector
