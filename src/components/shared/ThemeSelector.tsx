import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Dropdown } from '@/components/ui'
import { HiColorSwatch } from 'react-icons/hi'

const ThemeSelector: React.FC = () => {
    const { specialty, setSpecialty } = useThemeStore()

    const themes = [
        {
            value: 'default',
            label: 'Default Theme',
            description: 'Standard healthcare platform theme',
        },
        {
            value: 'organ-transplant',
            label: 'Organ Transplant',
            description: 'Specialized theme for organ transplant services',
        },
        {
            value: 'cosmetic-surgery',
            label: 'Cosmetic Surgery',
            description: 'Specialized theme for cosmetic surgery services',
        },
    ]

    const currentTheme = themes.find((t) => t.value === specialty)

    return (
        <Dropdown
            placement="bottom-end"
            renderTitle={
                <div className="flex items-center">
                    <HiColorSwatch className="text-lg" />
                    <span className="ml-2">{currentTheme?.label}</span>
                </div>
            }
        >
            <Dropdown.Item variant="header">Select Theme</Dropdown.Item>
            {themes.map((theme) => (
                <Dropdown.Item
                    key={theme.value}
                    eventKey={theme.value}
                    active={theme.value === specialty}
                    onClick={() => setSpecialty(theme.value as any)}
                >
                    <div>
                        <div className="font-medium">{theme.label}</div>
                        <div className="text-xs text-gray-500">
                            {theme.description}
                        </div>
                    </div>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ThemeSelector 