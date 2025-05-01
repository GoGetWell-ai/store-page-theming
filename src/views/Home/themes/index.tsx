import { useThemeStore } from '@/store/themeStore'
import type { Meta } from '@/@types/routes'

const themes = [
    {
        name: 'Default',
        id: 'default',
        description: 'The standard theme layout',
    },
    {
        name: 'Cardiology',
        id: 'theme1',
        description: 'A theme specialized for cardiology clinics',
    },
    {
        name: 'Cosmetic Surgery',
        id: 'theme2',
        description: 'Aesthetic-focused theme for cosmetic practices',
    },
]

const ThemesPage = (_props: Meta) => {
    const { specialty, setSpecialty } = useThemeStore()

    const handleThemeChange = (id: 'default' | 'theme1' | 'theme2') => {
        setSpecialty(id)
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Choose a Theme</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        className={`border rounded-lg p-4 shadow-md transition duration-200 ${
                            specialty === theme.id
                                ? 'border-primary bg-primaryMild'
                                : 'border-gray-300'
                        }`}
                    >
                        <h2 className="text-xl font-semibold">{theme.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            {theme.description}
                        </p>
                        <button
                            className={`px-4 py-2 rounded-md text-white ${
                                specialty === theme.id
                                    ? 'bg-primary-deep'
                                    : 'bg-primary'
                            }`}
                            onClick={() =>
                                handleThemeChange(
                                    theme.id as 'default' | 'theme1' | 'theme2',
                                )
                            }
                        >
                            {specialty === theme.id
                                ? 'Selected'
                                : 'Use this Theme'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ThemesPage
