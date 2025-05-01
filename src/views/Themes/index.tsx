import { Card } from '@/components/ui'
import { HiColorSwatch } from 'react-icons/hi'
import { useThemeStore } from '@/store/themeStore'
import { themeConfigs } from '@/configs/theme.config'
import { useEffect, useState } from 'react'
import { 
    FaClinicMedical,
    FaUserMd, 
    FaUserInjured,
    FaHeartbeat,
    FaUserPlus,
    FaCalendarAlt,
    FaHospital,
    FaClipboardList,
    FaCut,
    FaSmile,
    FaChartLine,
    FaComments
} from 'react-icons/fa'

// Specialty-specific service options
const specialtyServices = {
    'organ-transplant': [
        { 
            icon: <FaHeartbeat />,
            title: 'Find a Donor',
            description: 'Search our donor registry or register as a donor',
            action: 'Find Donor'
        },
        {
            icon: <FaUserPlus />,
            title: 'Patient Registration',
            description: 'Register as a transplant recipient',
            action: 'Register Now'
        },
        {
            icon: <FaCalendarAlt />,
            title: 'Pre-transplant Evaluation',
            description: 'Schedule your initial evaluation',
            action: 'Schedule'
        },
        {
            icon: <FaHospital />,
            title: 'Transplant Centers',
            description: 'Find transplant centers near you',
            action: 'Find Centers'
        }
    ],
    'cosmetic-surgery': [
        {
            icon: <FaClipboardList />,
            title: 'Procedure Types',
            description: 'Explore our range of cosmetic procedures',
            action: 'View Procedures'
        },
        {
            icon: <FaCut />,
            title: 'Virtual Consultation',
            description: 'Get a virtual assessment of your desired procedure',
            action: 'Start Consultation'
        },
        {
            icon: <FaSmile />,
            title: 'Before & After Gallery',
            description: 'View real patient results',
            action: 'View Gallery'
        },
        {
            icon: <FaChartLine />,
            title: 'Recovery Timeline',
            description: 'Learn about the recovery process',
            action: 'Learn More'
        }
    ],
    'default': [
        {
            icon: <FaCalendarAlt />,
            title: 'Book Appointment',
            description: 'Schedule a consultation with our doctors',
            action: 'Book Now'
        },
        {
            icon: <FaUserMd />,
            title: 'Find Doctor',
            description: 'Search for specialists in our network',
            action: 'Search'
        },
        {
            icon: <FaComments />,
            title: 'Online Consultation',
            description: 'Get medical advice from home',
            action: 'Start Chat'
        },
        {
            icon: <FaClipboardList />,
            title: 'Health Records',
            description: 'Access your medical history',
            action: 'View Records'
        }
    ]
}

const ServiceCard = ({ service, theme }) => {
    return (
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${
                    theme === 'default' 
                        ? 'bg-blue-100 text-blue-600'
                        : theme === 'organ-transplant'
                            ? 'bg-teal-100 text-teal-600'
                            : 'bg-purple-100 text-purple-600'
                }`}>
                    {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'default'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : theme === 'organ-transplant'
                            ? 'bg-teal-600 hover:bg-teal-700 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}>
                    {service.action}
                </button>
            </div>
        </Card>
    )
}

const ThemePreview = ({ theme, isSelected, onSelect }) => {
    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                isSelected 
                    ? 'ring-4 ring-primary shadow-xl transform scale-[1.02]' 
                    : 'hover:shadow-xl'
            }`}
            onClick={onSelect}
        >
            <div className="p-6 flex flex-col items-center text-center">
                {/* Theme Icon */}
                <div className={`p-6 rounded-2xl mb-4 ${
                    theme.id === 'base' 
                        ? 'bg-blue-100 text-blue-600'
                        : theme.id === 'theme1'
                            ? 'bg-teal-100 text-teal-600'
                            : 'bg-purple-100 text-purple-600'
                }`}>
                    {theme.id === 'base' && <FaClinicMedical className="text-4xl" />}
                    {theme.id === 'theme1' && <FaUserMd className="text-4xl" />}
                    {theme.id === 'theme2' && <FaUserInjured className="text-4xl" />}
                </div>

                {/* Theme Title and Description */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                    <p className="text-gray-600 text-sm">{theme.specialtyConfig.heroSection.description}</p>
                </div>

                {isSelected && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Active Theme
                    </div>
                )}
            </div>
        </Card>
    )
}

const Themes = () => {
    const { specialty, setSpecialty } = useThemeStore()
    const [showServices, setShowServices] = useState(false)

    const themes = [
        {
            id: 'base',
            name: 'General Healthcare',
            value: 'default',
            ...themeConfigs.base,
        },
        {
            id: 'theme1',
            name: 'Organ Transplant Center',
            value: 'organ-transplant',
            ...themeConfigs.theme1,
        },
        {
            id: 'theme2',
            name: 'Cosmetic Surgery',
            value: 'cosmetic-surgery',
            ...themeConfigs.theme2,
        },
    ]

    // Get the current theme's styles
    const currentTheme = themes.find(theme => theme.value === specialty) || themes[0]

    // Handle theme selection
    const handleThemeSelect = (theme) => {
        setSpecialty(theme.value)
        setShowServices(true)
        // Apply theme styles immediately
        document.documentElement.style.setProperty('--primary-color', theme.colors.primary.main)
        document.documentElement.style.setProperty('--primary-light', theme.colors.primary.light)
        document.documentElement.style.setProperty('--primary-dark', theme.colors.primary.dark)
        document.documentElement.style.fontFamily = theme.typography.fontFamily
    }

    // Effect to show services on mount if theme is selected
    useEffect(() => {
        if (specialty) {
            setShowServices(true)
        }
    }, [])

    return (
        <div 
            className="min-h-screen"
            style={{
                background: currentTheme.colors.background.default,
                color: currentTheme.colors.text.primary,
                fontFamily: currentTheme.typography.fontFamily
            }}
        >
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                        currentTheme.id === 'base' 
                            ? 'bg-blue-100 text-blue-600'
                            : currentTheme.id === 'theme1'
                                ? 'bg-teal-100 text-teal-600'
                                : 'bg-purple-100 text-purple-600'
                    }`}>
                        <HiColorSwatch className="text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Select Your Specialty</h1>
                    <p className="text-gray-600">
                        Choose your medical practice specialty to customize the entire application's appearance and content.
                    </p>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    {themes.map((theme) => (
                        <ThemePreview
                            key={theme.id}
                            theme={theme}
                            isSelected={specialty === theme.value}
                            onSelect={() => handleThemeSelect(theme)}
                        />
                    ))}
                </div>

                {/* Specialty Services Section */}
                {showServices && specialty && (
                    <div className="mt-16">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold mb-4">Available Services</h2>
                            <p className="text-gray-600">
                                Explore the specialized services available for your medical practice
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {specialtyServices[specialty].map((service, index) => (
                                <ServiceCard 
                                    key={index} 
                                    service={service}
                                    theme={specialty}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Themes 