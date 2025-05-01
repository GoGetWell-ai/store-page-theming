// src/views/Theme/index.tsx
import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import MenuBar from '@/components/shared/MenuBar'
import { ThemeSpecialty } from '@/@types/theme'
import { Button } from '@/components/ui'
import { baseColors } from '../Home/themes/base'
import { theme1Colors } from '../Home/themes/theme1'
import { theme2Colors } from '../Home/themes/theme2'

interface ThemeCardProps {
    title: string
    specialty: ThemeSpecialty
    description: string
    colorPalette: Record<string, string>
    isActive: boolean
    onClick: () => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({
    title,
    description,
    colorPalette,
    isActive,
    onClick,
}) => {
    return (
        <div
            className={`rounded-xl p-6 shadow-md transition-all cursor-pointer border-2 
            ${isActive ? 'border-[var(--primary)] scale-105' : 'border-transparent hover:scale-102'}`}
            style={{
                background: colorPalette.neutral,
            }}
            onClick={onClick}
        >
            <h3
                className="text-xl font-bold mb-2"
                style={{ color: colorPalette.primary }}
            >
                {title}
            </h3>
            <p className="text-text mb-4">{description}</p>

            <div className="flex space-x-2 mb-4">
                {[
                    colorPalette.primary,
                    colorPalette.secondary,
                    colorPalette.accent,
                ].map((color, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 rounded-full shadow-sm"
                        style={{ backgroundColor: color }}
                        aria-label={`Theme color ${index + 1}`}
                    />
                ))}
            </div>

            <button
                className="px-4 py-2 rounded-md text-white font-semibold"
                style={{ backgroundColor: colorPalette.primary }}
            >
                {isActive ? 'Active Theme' : 'Apply Theme'}
            </button>
        </div>
    )
}

const Theme: React.FC = () => {
    const { specialty, setSpecialty, setSchema, mode, setMode } =
        useThemeStore()

    const themesData = [
        {
            title: 'Default Theme',
            specialty: 'default' as ThemeSpecialty,
            description:
                'The standard medical interface with a professional and clean design.',
            colorPalette: baseColors[mode],
        },
        {
            title: 'Organ Transplant',
            specialty: 'organTransplant' as ThemeSpecialty,
            description:
                'Specialized theme for organ transplant departments with calming green tones.',
            colorPalette: theme1Colors[mode],
        },
        {
            title: 'Cosmetic Surgery',
            specialty: 'cosmeticSurgery' as ThemeSpecialty,
            description:
                'Elegant and sophisticated design for cosmetic surgery specialists.',
            colorPalette: theme2Colors[mode],
        },
    ]

    return (
        <div className="min-h-screen dark:text-neutral bg-background">
            <MenuBar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-2 text-[var(--heading)]">
                    Theme Gallery
                </h1>
                <p className="mb-8 text-lg ">
                    Select a theme to customize the look and feel of the
                    GoGetWell.ai platform for your medical specialty.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {themesData.map((theme) => (
                        <ThemeCard
                            key={theme.specialty}
                            title={theme.title}
                            specialty={theme.specialty}
                            description={theme.description}
                            colorPalette={theme.colorPalette}
                            isActive={specialty === theme.specialty}
                            onClick={() => {
                                setSpecialty(theme.specialty)
                                setSchema(theme.specialty)
                                setMode(mode)
                            }}
                        />
                    ))}
                </div>

                <div className="mt-12 p-6 dark:bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4  text-[var(--heading)]">
                        Theme Preview
                    </h2>
                    <p className="mb-4">
                        This is how UI elements will appear with the selected
                        theme:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Buttons</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="solid">Primary Button</Button>
                                <Button variant="default">
                                    Default Button
                                </Button>
                                <Button variant="plain">Plain Button</Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">
                                Typography
                            </h3>
                            <h4 className="text-lg font-semibold mb-1">
                                Heading Text
                            </h4>
                            <p className="mb-2">
                                Body text example with the current theme
                                applied.
                            </p>
                            <span className="text-sm">Small text variant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Theme
