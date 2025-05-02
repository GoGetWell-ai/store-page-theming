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
// Update your themeConfig to use CSS variables
const themeConfig = {
    default: {
        name: 'Default Medical Theme',
        description: 'Professional theme for general healthcare services',
        primaryColor: 'var(--primary)',
        secondaryColor: 'var(--primary-mild)',
        accentColor: '#4dabf5',
        fontFamily: 'Roboto, Arial, sans-serif',
        borderRadius: '0.25rem',
        example: 'A standard medical interface with clear navigation and readable text.',
        bgClass: 'card-gradient card-gradient-primary text-white',
        textClass: 'text-primary',
        borderClass: 'border-primary border-2',
        ringClass: 'ring-primary ring-2',
        hoverClass: 'hover:bg-primary-deep',
        gradientClass: 'from-[var(--primary)] to-[var(--primary-deep)]',
    },
    organTransplant: {
        name: 'Organ Transplant Theme',
        description: 'Specialized theme for transplantation services',
        primaryColor: 'var(--primary)',
        secondaryColor: 'var(--primary-mild)',
        accentColor: '#00acc1',
        fontFamily: 'Merriweather, Georgia, serif',
        borderRadius: '0.25rem',
        example: 'Focus on medical data presentation with clear hierarchy for critical information.',
        bgClass: 'card-gradient card-gradient-success text-white',
        textClass: 'text-primary',
        borderClass: 'border-primary border-2',
        ringClass: 'ring-primary ring-2',
        hoverClass: 'hover:bg-primary-deep',
        gradientClass: 'from-[var(--primary)] to-[var(--primary-deep)]',
    },
    cosmeticSurgery: {
        name: 'Cosmetic Surgery Theme',
        description: 'Elegant theme for aesthetic medicine',
        primaryColor: 'var(--primary)',
        secondaryColor: 'var(--primary-mild)',
        accentColor: '#ec407a',
        fontFamily: 'Playfair Display, Georgia, serif',
        borderRadius: '0.5rem',
        example: 'Sophisticated presentation for aesthetic procedures and outcomes.',
        bgClass: 'card-gradient card-gradient-primary text-white',
        textClass: 'text-primary',
        borderClass: 'border-primary border-2',
        ringClass: 'ring-primary ring-2',
        hoverClass: 'hover:bg-primary-deep',
        gradientClass: 'from-[var(--primary)] to-[var(--primary-deep)]',
    },
}

interface ThemePreviewCardProps {
    themeKey: string;
    active: boolean;
    onSelect: () => void;
}

const ThemePreviewCard = ({ themeKey, active, onSelect }: ThemePreviewCardProps) => {
    const theme = themeConfig[themeKey as keyof typeof themeConfig] || themeConfig.default

    return (
        <Card
            className={`theme-card transition-all duration-300 ${active
                ? `${theme.borderClass} ${theme.ringClass} ring-offset-2 card-border`
                : 'border border-gray-200 hover:border-gray-300'
                }`}
            headerClass={`${theme.bgClass} card-gradient-animated`}
            header={
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium">{theme.name}</h4>
                    {active && <Badge className="bg-white text-gray-700 pulse" content="Active" />}
                </div>
            }
            footer={
                <div className="flex justify-between items-center">
                    <Button
                        size="sm"
                        className={`btn-ripple transition-all duration-300 ${active
                            ? 'bg-gray-200 text-gray-600 cursor-default'
                            : `bg-gradient-to-r ${theme.gradientClass} text-white hover:shadow-lg transform hover:-translate-y-1`
                            }`}
                        icon={active ? <HiCheck /> : <HiOutlineColorSwatch />}
                        onClick={onSelect}
                        disabled={active}
                    >
                        {active ? 'Current Theme' : 'Apply Theme'}
                    </Button>
                    <div className="flex gap-2">
                        {[theme.primaryColor, theme.secondaryColor, theme.accentColor].map((color, i) => (
                            <div key={i} className="h-5 w-5 rounded-full shadow-inner" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                </div>
            }
        >
            <div className="p-4">
                <p className="mb-3 text-gray-600">{theme.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 fade-in">
                    <div className="text-sm">
                        <span className="font-bold block">Primary Color</span>
                        <span style={{ color: theme.primaryColor }}>{theme.primaryColor}</span>
                    </div>
                    <div className="text-sm">
                        <span className="font-bold block">Font Family</span>
                        <span>{theme.fontFamily.split(',')[0]}</span>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Sample Terms:</span>
                    <div className="flex flex-wrap gap-1">
                        {sampleMedicalTerms[themeKey as keyof typeof sampleMedicalTerms].map((term, index) => (
                            <Tag key={index} className={`text-xs ${theme.textClass} stagger-fade-in`}>{term}</Tag>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

const ComponentShowcase = ({ activeTheme }: { activeTheme: string }) => {
    const theme = themeConfig[activeTheme as keyof typeof themeConfig] || themeConfig.default

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
                        <h6 className="mb-3 font-medium">Interactive Elements</h6>
                        <div className="space-y-4">
                            <Button className={`btn-gradient btn-ripple bg-gradient-to-r ${theme.gradientClass}`} size="sm">
                                Primary Action
                            </Button>
                            <div className="ml-2 inline-block">
                                <Button size="sm" variant="twoTone">Secondary</Button>
                            </div>
                            <div className="ml-2 inline-block">
                                <Button size="sm" variant="plain">Tertiary</Button>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">With Label</label>
                                <Input prefix={<HiOutlineDocument className={theme.textClass} />} placeholder="Search documents" />
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Avatar shape="circle" size={40} className={theme.bgClass}>
                                    {activeTheme.substring(0, 2).toUpperCase()}
                                </Avatar>
                                <div>
                                    <div className="font-bold">User Profile</div>
                                    <div className="text-sm text-gray-500">Medical Staff</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-3 font-medium">Status Components</h6>
                        <div className="space-y-4">
                            <Alert showIcon type="success" title="Procedure Scheduled" className="mb-4 fade-in">
                                Your appointment is confirmed.
                            </Alert>
                            <Alert showIcon type="info" title="Information Available" className="mb-4 fade-in">
                                New research published.
                            </Alert>
                            <Tabs defaultValue="tab1">
                                <Tabs.TabList>
                                    <Tabs.TabNav value="tab1">Details</Tabs.TabNav>
                                    <Tabs.TabNav value="tab2">History</Tabs.TabNav>
                                    <Tabs.TabNav value="tab3">Reports</Tabs.TabNav>
                                </Tabs.TabList>
                                <div className="p-4">
                                    <Tabs.TabContent value="tab1">Patient details would appear here.</Tabs.TabContent>
                                    <Tabs.TabContent value="tab2">Medical history records.</Tabs.TabContent>
                                    <Tabs.TabContent value="tab3">Medical reports and test results.</Tabs.TabContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const TypographyShowcase = ({ activeTheme }: { activeTheme: string }) => {
    const theme = themeConfig[activeTheme as keyof typeof themeConfig] || themeConfig.default

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
                            <span className={`ml-1 ${theme.textClass} gradient-text`}>colored text</span>,
                            and <span className="ml-1 underline">underlined text</span>.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const ThemesPage = () => {
    const specialty = useThemeStore((state) => state.specialty)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)
    const [isChangingTheme, setIsChangingTheme] = useState(false)

    const handleSelectTheme = (themeKey: string) => {
        setIsChangingTheme(true)
        try {
            setSpecialty(themeKey as 'default' | 'organTransplant' | 'cosmeticSurgery')
        } finally {
            setIsChangingTheme(false)
        }
    }

    if (isChangingTheme) {
        return <div className="text-center py-8">Applying theme...</div>
    }

    const themeKeys = ['default', 'organTransplant', 'cosmeticSurgery'] as const

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 fade-in">
                <h1 className="text-3xl font-bold mb-2">Medical Specialty Themes</h1>
                <p className="text-gray-600">
                    Select a theme to customize the appearance of the medical platform based on your specialty.
                </p>
            </div>

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
                <ComponentShowcase activeTheme={specialty} />
                <TypographyShowcase activeTheme={specialty} />
            </div>
        </div>
    )
}

export default ThemesPage