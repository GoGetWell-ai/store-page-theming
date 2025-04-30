import { useThemeStore } from '@/store/themeStore'
import { Card } from '@/components/ui'

/**
 * Themes Page Component
 *
 * This component displays information about different theme specialties
 * and provides visual examples of each theme.
 */
const Themes = () => {
    const specialty = useThemeStore((state) => state.specialty)

    // Theme descriptions
    const themeInfo = {
        default: {
            title: 'Default Medical Theme',
            description:
                'A clean, professional theme for general healthcare services.',
            features: [
                'Blue color palette representing trust and professionalism',
                'Clean typography for optimal readability',
                'Standard medical iconography',
                'Professional layout for general medical contexts',
            ],
        },
        organTransplant: {
            title: 'Organ Transplant Theme',
            description:
                'Specialized theme for organ transplantation services.',
            features: [
                'Teal/green color palette representing life and renewal',
                'Professional serif typography for medical authority',
                'Specialized medical terminology styling',
                'Data-focused design elements for patient statistics',
            ],
        },
        cosmeticSurgery: {
            title: 'Cosmetic Surgery Theme',
            description: 'Elegant theme designed for aesthetic medicine.',
            features: [
                'Pink/rose color palette representing beauty and transformation',
                'Elegant typography with golden ratio proportions',
                'Light, clean backgrounds for a modern feel',
                'Visual-focused design for before/after presentations',
            ],
        },
    }

    // Get current theme information
    const currentTheme = themeInfo[specialty as keyof typeof themeInfo]

    // Get theme-specific styling
    const getThemeHeaderColors = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'bg-teal-700 text-white'
            case 'cosmeticSurgery':
                return 'bg-pink-700 text-white'
            default:
                return 'bg-primary text-white'
        }
    }

    const getThemeBorderColors = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'border-teal-700'
            case 'cosmeticSurgery':
                return 'border-pink-700'
            default:
                return 'border-primary'
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">
                Medical Specialty Themes
            </h1>

            {/* Current Theme Card */}
            <Card
                className={`mb-8 border-2 ${getThemeBorderColors()}`}
                headerClass={getThemeHeaderColors()}
                header={
                    <h4 className="text-lg">
                        Current Theme: {currentTheme.title}
                    </h4>
                }
            >
                <div className="p-4">
                    <p className="mb-4">{currentTheme.description}</p>
                    <h5 className="font-medium mb-2">Features:</h5>
                    <ul className="list-disc pl-5">
                        {currentTheme.features.map((feature, index) => (
                            <li key={index} className="mb-1">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* All Themes Section */}
            <h2 className="text-2xl font-bold mb-4">Available Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(themeInfo).map(([key, theme]) => (
                    <Card
                        key={key}
                        className={`${key === specialty ? 'ring-2 ring-offset-2' : ''} ${
                            key === specialty
                                ? specialty === 'organTransplant'
                                    ? 'ring-teal-500'
                                    : specialty === 'cosmeticSurgery'
                                      ? 'ring-pink-500'
                                      : 'ring-primary'
                                : ''
                        }`}
                        headerClass={
                            key === 'organTransplant'
                                ? 'bg-teal-700 text-white'
                                : key === 'cosmeticSurgery'
                                  ? 'bg-pink-700 text-white'
                                  : 'bg-primary text-white'
                        }
                        header={<h4 className="text-lg">{theme.title}</h4>}
                    >
                        <div className="p-4">
                            <p className="mb-2">{theme.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Themes
