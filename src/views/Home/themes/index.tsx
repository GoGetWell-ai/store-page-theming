import type { SpecialtyType } from '@/@types/theme'
import MenuBar from '@/components/shared/MenuBar'
import Footer from '@/components/template/Footer'
import { Button, Card } from '@/components/ui'
import { useThemeStore } from '@/store/themeStore'

// Import theme configurations
import { colors as defaultColors } from './base/colors'
import { typography as defaultTypography } from './base/typography'
import { colors as cosmeticSurgeryColors } from './cosmetic-surgery/colors'
import { typography as cosmeticSurgeryTypography } from './cosmetic-surgery/typography'
import { colors as organTransplantColors } from './organ-transplant/colors'
import { typography as organTransplantTypography } from './organ-transplant/typography'

const ThemesPage = () => {
    const { specialty, setSpecialty } = useThemeStore()

    const themes = [
        {
            id: 'default',
            name: 'Default Theme',
            description:
                'Our standard medical interface with a professional blue color scheme.',
            specialty: 'default' as SpecialtyType,
            colors: defaultColors,
            typography: defaultTypography,
            features: [
                'Clean and professional design',
                'Optimized for general medical services',
                'Balanced color scheme for readability',
                'Standard typography for clear communication',
            ],
            heroText: 'We Handle Everything, You Focus on Healing',
            subText:
                'Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language',
        },
        {
            id: 'organ-transplant',
            name: 'Organ Transplant',
            description:
                'A specialized theme for organ transplant services with a calming green palette.',
            specialty: 'organ-transplant' as SpecialtyType,
            colors: organTransplantColors,
            typography: organTransplantTypography,
            features: [
                'Calming green color scheme',
                'Optimized for transplant information',
                'Clear typography for medical details',
                'Specialized UI for patient journeys',
            ],
            heroText: 'New Life, New Possibilities',
            subText:
                'Expert Transplant Care with Personalized Support Every Step of the Way',
        },
        {
            id: 'cosmetic-surgery',
            name: 'Cosmetic Surgery',
            description:
                'An elegant theme for cosmetic and plastic surgery with a sophisticated design.',
            specialty: 'cosmetic-surgery' as SpecialtyType,
            colors: cosmeticSurgeryColors,
            typography: cosmeticSurgeryTypography,
            features: [
                'Elegant pink and purple palette',
                'Sophisticated typography with serif headings',
                'Visually appealing layouts',
                'Designed for aesthetic medicine',
            ],
            heroText: 'Reveal Your True Beauty',
            subText:
                'Personalized Cosmetic Procedures with Natural-Looking Results by Expert Surgeons',
        },
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col w-full">
            <MenuBar />
            <div className="flex-grow w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-text-primary mb-4">
                        Theme Gallery
                    </h1>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Choose from our specialized themes designed for
                        different medical specialties. Each theme provides a
                        unique experience tailored to specific healthcare
                        contexts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {themes.map((theme) => (
                        <Card
                            key={theme.id}
                            className={`overflow-hidden transition-all duration-300 h-full ${
                                specialty === theme.specialty
                                    ? 'ring-2 ring-primary transform scale-[1.02]'
                                    : 'hover:shadow-lg'
                            }`}
                        >
                            <div
                                className="h-48 flex items-center justify-center p-4 sm:p-6 text-center"
                                style={{
                                    backgroundColor: theme.colors.heroBg,
                                    color: theme.colors.heroText,
                                }}
                            >
                                <div>
                                    <h2
                                        className="text-2xl font-bold mb-2"
                                        style={{
                                            fontFamily:
                                                theme.typography.headingFamily,
                                        }}
                                    >
                                        {theme.heroText}
                                    </h2>
                                    <p
                                        className="text-sm opacity-90"
                                        style={{
                                            fontFamily: theme.typography.family,
                                        }}
                                    >
                                        {theme.subText}
                                    </p>
                                </div>
                            </div>
                            <Card className="h-full flex flex-col">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-text-primary">
                                        {theme.name}
                                    </h3>
                                    <p className="text-text-secondary mb-4">
                                        {theme.description}
                                    </p>

                                    <h4 className="font-semibold text-text-primary mb-2">
                                        Features:
                                    </h4>
                                    <ul className="mb-6 space-y-1">
                                        {theme.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="text-text-secondary text-sm flex items-start"
                                                >
                                                    <span className="text-primary mr-2 flex-shrink-0">
                                                        ✓
                                                    </span>
                                                    <span className="break-words">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    theme.colors.primary,
                                            }}
                                            title="Primary"
                                        ></div>
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    theme.colors.secondary,
                                            }}
                                            title="Secondary"
                                        ></div>
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    theme.colors.accent,
                                            }}
                                            title="Accent"
                                        ></div>
                                        <div
                                            className="w-8 h-8 rounded-full border border-gray-200"
                                            style={{
                                                backgroundColor:
                                                    theme.colors.background,
                                            }}
                                            title="Background"
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Button
                                        block
                                        variant={
                                            specialty === theme.specialty
                                                ? 'solid'
                                                : 'plain'
                                        }
                                        style={{
                                            backgroundColor:
                                                specialty === theme.specialty
                                                    ? theme.colors.primary
                                                    : '',
                                            color:
                                                specialty === theme.specialty
                                                    ? theme.colors.buttonText
                                                    : '',
                                        }}
                                        onClick={() =>
                                            setSpecialty(theme.specialty)
                                        }
                                    >
                                        {specialty === theme.specialty
                                            ? 'Current Theme'
                                            : 'Apply Theme'}
                                    </Button>
                                </div>
                            </Card>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <Footer pageContainerType="contained" className="w-full" />
            </div>
        </div>
    )
}

export default ThemesPage
