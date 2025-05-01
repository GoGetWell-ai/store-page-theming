// src/views/Home/components/Themes.tsx
import { useThemeStore } from '@/store/themeStore'
import { Card } from '@/components/ui'
import { useEffect } from 'react'

// Define complete theme info with fallbacks
const themeInfo = {
    base: {
        title: 'Base Medical Theme',
        description: 'Default healthcare services theme',
        features: ['Feature 1', 'Feature 2']
    },
    cosmeticSurg: {
        title: 'Cosmetic Surgery Theme',
        description: 'Aesthetic medicine theme',
        features: ['Feature 1', 'Feature 2']
    },
    organTransplant: {
        title: 'Organ Transplant Theme',
        description: 'Transplantation services theme',
        features: ['Feature 1', 'Feature 2']
    }
}

const Themes = () => {
    const specialty = useThemeStore((state) => state.specialty)

    // Safe theme access with fallback
    const currentTheme = themeInfo[specialty as keyof typeof themeInfo] || themeInfo.base

    // Debugging
    useEffect(() => {
        console.log('Current theme:', specialty)
    }, [specialty])

    if (!currentTheme) {
        return <div className="p-4 text-red-500">Error: Theme data not available</div>
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Medical Specialty Themes</h1>

            {/* Current Theme Card */}
            <Card className="mb-8">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Current Theme: {currentTheme.title}
                    </h2>
                    <p className="mb-4">{currentTheme.description}</p>

                    <h5 className="font-medium mb-2">Features:</h5>
                    <ul className="list-disc pl-5">
                        {currentTheme.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* All Themes */}
            <h2 className="text-2xl font-bold mb-4">Available Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(themeInfo).map(([key, theme]) => (
                    <Card key={key}>
                        <div className="p-4">
                            <h3 className="text-lg font-medium">{theme.title}</h3>
                            <p className="text-sm mt-2">{theme.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Themes