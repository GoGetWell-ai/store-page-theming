import classNames from '@/utils/classNames'
import { TbCheck } from 'react-icons/tb'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'
import { useThemeStore } from '@/store/themeStore'

const ThemeSwitcher = () => {
    const schema = useThemeStore((state) => state.themeSchema)
    const setSchema = useThemeStore((state) => state.setSchema)
    const mode = useThemeStore((state) => state.mode)
    const specialty = useThemeStore((state) => state.specialty)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)

    // Specialty themes
    const specialtyThemes = [
        { 
            id: 'default', 
            label: 'Default',
            color: '#2a85ff'
        },
        { 
            id: 'organ-transplant', 
            label: 'Organ Transplant',
            color: '#16a34a'
        },
        { 
            id: 'cosmetic-surgery', 
            label: 'Cosmetic Surgery',
            color: '#db2777'
        }
    ];

    return (
        <div className="space-y-4">
            {/* Color schema selector */}
            <div className="inline-flex items-center gap-2">
                {Object.entries(presetThemeSchemaConfig).map(([key, value]) => (
                    <button
                        key={key}
                        className={classNames(
                            'h-8 w-8 rounded-full flex items-center justify-center border-2 border-white',
                            schema === key && 'ring-2 ring-primary',
                        )}
                        style={{ backgroundColor: value[mode].primary || '' }}
                        onClick={() => setSchema(key)}
                    >
                        {schema === key ? (
                            <TbCheck className="text-neutral text-lg" />
                        ) : (
                            <></>
                        )}
                    </button>
                ))}
            </div>
            
            {/* Specialty theme selector */}
            <div className="space-y-2">
                <h6 className="text-sm font-medium">Specialty Themes</h6>
                <div className="grid grid-cols-3 gap-2">
                    {specialtyThemes.map((theme) => (
                        <button
                            key={theme.id}
                            className={classNames(
                                'px-3 py-2 rounded-md text-xs font-medium transition-colors',
                                specialty === theme.id 
                                    ? 'bg-primary-subtle text-primary border border-primary' 
                                    : 'border border-gray-200 hover:border-primary hover:bg-primary-subtle hover:bg-opacity-50'
                            )}
                            onClick={() => setSpecialty(theme.id as any)}
                        >
                            <div className="flex items-center justify-center mb-1">
                                <span 
                                    className="w-4 h-4 rounded-full" 
                                    style={{ backgroundColor: theme.color }}
                                ></span>
                            </div>
                            {theme.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ThemeSwitcher
