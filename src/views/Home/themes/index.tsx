import { useState } from 'react'
import { useThemeStore } from '@/store/themeStore'
import {
    Card,
    Button,
    Alert,
    Tag,
    Input,
    Badge,
    Avatar,
    Tabs,
} from '@/components/ui'
import {
    HiOutlineColorSwatch,
    HiCheck,
    HiOutlineDocument,
    HiOutlinePhotograph,
    HiOutlineCube,
} from 'react-icons/hi'

// Sample data for demonstrating text content in different themes
const sampleMedicalTerms = {
    default: [
        'Vaccination',
        'General Checkup',
        'Primary Care',
        'Preventive Medicine',
    ],
    organTransplant: [
        'Kidney Transplant',
        'Organ Donation',
        'Immunosuppression',
        'Tissue Matching',
    ],
    cosmeticSurgery: [
        'Rhinoplasty',
        'Botox',
        'Liposuction',
        'Facial Rejuvenation',
    ],
}

// Theme configuration details
const themeConfig = {
    default: {
        name: 'Default Medical Theme',
        description: 'Professional theme for general healthcare services',
        primaryColor: '#1976d2',
        secondaryColor: '#90caf9',
        accentColor: '#4dabf5',
        fontFamily: 'Roboto, Arial, sans-serif',
        borderRadius: '0.25rem',
        example:
            'A standard medical interface with clear navigation and readable text.',
        bgClass: 'card-gradient card-gradient-primary text-white',
        textClass: 'text-primary',
        borderClass: 'border-primary',
        hoverClass: 'hover:bg-primary-deep',
        gradientClass: 'from-blue-700 to-blue-500',
    },
    organTransplant: {
        name: 'Organ Transplant Theme',
        description: 'Specialized theme for transplantation services',
        primaryColor: '#006064',
        secondaryColor: '#4dd0e1',
        accentColor: '#00acc1',
        fontFamily: 'Merriweather, Georgia, serif',
        borderRadius: '0.25rem',
        example:
            'Focus on medical data presentation with clear hierarchy for critical information.',
        bgClass: 'card-gradient card-gradient-success text-white',
        textClass: 'text-teal-700',
        borderClass: 'border-teal-700',
        hoverClass: 'hover:bg-teal-800',
        gradientClass: 'from-teal-700 to-teal-500',
    },
    cosmeticSurgery: {
        name: 'Cosmetic Surgery Theme',
        description: 'Elegant theme for aesthetic medicine',
        primaryColor: '#ad1457',
        secondaryColor: '#f48fb1',
        accentColor: '#ec407a',
        fontFamily: 'Playfair Display, Georgia, serif',
        borderRadius: '0.5rem',
        example:
            'Sophisticated presentation for aesthetic procedures and outcomes.',
        bgClass: 'card-gradient card-gradient-primary text-white',
        textClass: 'text-pink-700',
        borderClass: 'border-pink-700',
        hoverClass: 'hover:bg-pink-800',
        gradientClass: 'from-pink-700 to-pink-500',
    },
}

// Define the props interface separately
interface ThemePreviewCardProps {
    themeKey: string
    active: boolean
    onSelect: () => void
}

/**
 * Theme Preview Card component to showcase each theme option
 */
const ThemePreviewCard = ({
    themeKey,
    active,
    onSelect,
}: ThemePreviewCardProps) => {
    // Get theme config based on theme key
    const theme = themeConfig[themeKey as keyof typeof themeConfig]

    return (
        <Card
            className={`theme-card card-hover transition-all ${
                active ? 'ring-2 ring-offset-2 ' + theme.borderClass : ''
            }`}
            headerClass={theme.bgClass + ' card-gradient-animated'}
            header={
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium">{theme.name}</h4>
                    {active && (
                        <Badge
                            className="bg-white text-gray-700 pulse"
                            content="Active"
                        />
                    )}
                </div>
            }
            footer={
                <div className="flex justify-between items-center">
                    <Button
                        size="sm"
                        className={`btn-ripple transition-all duration-300 ${
                            active
                                ? 'bg-gray-200 text-gray-600 cursor-default'
                                : `bg-gradient-to-r ${theme.gradientClass} text-white hover:shadow-lg transform hover:-translate-y-1`
                        }`}
                        icon={active ? <HiCheck /> : <HiOutlineColorSwatch />}
                        onClick={(e) => {
                            e.stopPropagation() // Prevent card click event from triggering
                            onSelect()
                        }}
                        disabled={active}
                    >
                        {active ? 'Current Theme' : 'Apply Theme'}
                    </Button>

                    <div className="flex gap-2">
                        <div
                            className="h-5 w-5 rounded-full shadow-inner"
                            style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <div
                            className="h-5 w-5 rounded-full shadow-inner"
                            style={{ backgroundColor: theme.secondaryColor }}
                        ></div>
                        <div
                            className="h-5 w-5 rounded-full shadow-inner"
                            style={{ backgroundColor: theme.accentColor }}
                        ></div>
                    </div>
                </div>
            }
            clickable={!active} // Make card clickable if it's not the active theme
            onClick={() => {
                if (!active) {
                    onSelect()
                }
            }}
        >
            <div className="p-4">
                <p className="mb-3 text-gray-600">{theme.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4 fade-in">
                    <div className="text-sm">
                        <span className="font-bold block">Primary Color</span>
                        <span style={{ color: theme.primaryColor }}>
                            {theme.primaryColor}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="font-bold block">Font Family</span>
                        <span>{theme.fontFamily.split(',')[0]}</span>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                        Sample Terms:
                    </span>
                    <div className="flex flex-wrap gap-1">
                        {sampleMedicalTerms[
                            themeKey as keyof typeof sampleMedicalTerms
                        ].map((term, index) => (
                            <Tag
                                key={index}
                                className={`text-xs ${theme.textClass} stagger-fade-in`}
                            >
                                {term}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

// Component showcases for different themes
const ComponentShowcase = ({ activeTheme }: { activeTheme: string }) => {
    // Get theme config based on active theme
    const theme = themeConfig[activeTheme as keyof typeof themeConfig]

    return (
        <Card
            className="mb-6 card-hover"
            header={
                <div className="flex items-center justify-between">
                    <h5 className="font-medium">Component Preview</h5>
                    <Tag className={theme.textClass}>
                        {activeTheme === 'default'
                            ? 'Standard Components'
                            : activeTheme === 'organTransplant'
                              ? 'Transplant UI'
                              : 'Aesthetic UI'}
                    </Tag>
                </div>
            }
        >
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h6 className="mb-3 font-medium">
                            Interactive Elements
                        </h6>
                        <div className="space-y-4">
                            <Button
                                className={`btn-gradient btn-ripple bg-gradient-to-r ${theme.gradientClass}`}
                                size="sm"
                            >
                                Primary Action
                            </Button>
                            <div className="ml-2 inline-block">
                                <Button size="sm" variant="twoTone">
                                    Secondary
                                </Button>
                            </div>
                            <div className="ml-2 inline-block">
                                <Button size="sm" variant="plain">
                                    Tertiary
                                </Button>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">With Label</label>
                                <Input
                                    prefix={
                                        <HiOutlineDocument
                                            className={theme.textClass}
                                        />
                                    }
                                    placeholder="Search documents"
                                />
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Avatar
                                    shape="circle"
                                    size={40}
                                    className={theme.bgClass}
                                >
                                    {activeTheme.substring(0, 2).toUpperCase()}
                                </Avatar>
                                <div>
                                    <div className="font-bold">
                                        User Profile
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Medical Staff
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-3 font-medium">Status Components</h6>
                        <div className="space-y-4">
                            <Alert
                                showIcon
                                type="success"
                                title="Procedure Scheduled"
                                className="mb-4 fade-in"
                            >
                                Your appointment is confirmed.
                            </Alert>

                            <Alert
                                showIcon
                                type="info"
                                title="Information Available"
                                className="mb-4 fade-in"
                            >
                                New research published.
                            </Alert>

                            <Tabs defaultValue="tab1">
                                <Tabs.TabList>
                                    <Tabs.TabNav value="tab1">
                                        Details
                                    </Tabs.TabNav>
                                    <Tabs.TabNav value="tab2">
                                        History
                                    </Tabs.TabNav>
                                    <Tabs.TabNav value="tab3">
                                        Reports
                                    </Tabs.TabNav>
                                </Tabs.TabList>
                                <div className="p-4">
                                    <Tabs.TabContent value="tab1">
                                        <p>
                                            Patient details would appear here.
                                        </p>
                                    </Tabs.TabContent>
                                    <Tabs.TabContent value="tab2">
                                        <p>Medical history records.</p>
                                    </Tabs.TabContent>
                                    <Tabs.TabContent value="tab3">
                                        <p>Medical reports and test results.</p>
                                    </Tabs.TabContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

/**
 * Typography showcase component
 */
const TypographyShowcase = ({ activeTheme }: { activeTheme: string }) => {
    const theme = themeConfig[activeTheme as keyof typeof themeConfig]

    return (
        <Card className="mb-6 card-hover">
            <div className="p-4">
                <h6 className="mb-4 font-medium">Typography Preview</h6>

                <div className="mb-6">
                    <div className="mb-2 font-bold">Headings</div>
                    <div>
                        <h1 className="text-2xl mb-1 font-bold">Heading 1</h1>
                        <h2 className="text-xl mb-1 font-bold">Heading 2</h2>
                        <h3 className="text-lg mb-1 font-bold">Heading 3</h3>
                        <h4 className="text-base mb-1 font-bold">Heading 4</h4>
                    </div>
                </div>

                <div>
                    <div className="mb-2 font-bold">Text Styles</div>
                    <div>
                        <p className="mb-2">
                            Regular paragraph text in{' '}
                            <span style={{ fontFamily: theme.fontFamily }}>
                                {theme.fontFamily.split(',')[0]}
                            </span>{' '}
                            font.
                        </p>
                        <p className="mb-2">
                            Text can appear in different styles like{' '}
                            <span className="font-bold">Bold text</span>,
                            <span className="italic ml-1">italic text</span>,
                            <span
                                className={`ml-1 ${theme.textClass} gradient-text`}
                            >
                                colored text
                            </span>
                            , and
                            <span className="ml-1 underline">
                                underlined text
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

/**
 * Main Themes Page Component
 */
const ThemesPage = () => {
    // Get theme state and setter from store
    const specialty = useThemeStore((state) => state.specialty)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)

    // Handle theme selection
    const handleSelectTheme = (themeKey: string) => {
        setSpecialty(
            themeKey as 'default' | 'organTransplant' | 'cosmeticSurgery',
        )
    }

    const themeKeys = ['default', 'organTransplant', 'cosmeticSurgery']

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 fade-in">
                <h1 className="text-3xl font-bold mb-2">
                    Medical Specialty Themes
                </h1>
                <p className="text-gray-600">
                    Select a theme to customize the appearance of the medical
                    platform based on your specialty. Each theme provides a
                    unique visual experience optimized for different medical
                    contexts.
                </p>
            </div>

            {/* Theme Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 stagger-fade-in">
                {themeKeys.map((themeKey) => (
                    <ThemePreviewCard
                        key={themeKey}
                        themeKey={themeKey}
                        active={specialty === themeKey}
                        onSelect={() => handleSelectTheme(themeKey)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Component Previews */}
                <ComponentShowcase activeTheme={specialty} />

                {/* Typography Previews */}
                <TypographyShowcase activeTheme={specialty} />
            </div>
        </div>
    )
}

export default ThemesPage
