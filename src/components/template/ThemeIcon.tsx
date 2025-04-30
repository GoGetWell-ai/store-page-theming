import { useThemeStore } from '@/store/themeStore'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { Dropdown } from '@/components/ui/Dropdown'
import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import { Menu } from '@headlessui/react'

interface ThemeIconProps extends CommonProps {
    className?: string
}

type ThemeOption = {
    value: string
    label: string
    color: string
}

const themeOptions: ThemeOption[] = [
    { value: 'default', label: 'Default', color: '#2a85ff' },
    { value: 'organ-transplant', label: 'Organ Transplant', color: '#16a34a' },
    { value: 'cosmetic-surgery', label: 'Cosmetic Surgery', color: '#db2777' },
]

const ThemeIcon = ({ className }: ThemeIconProps) => {
    const themeSchema = useThemeStore((state) => state.themeSchema)
    const setThemeSchema = useThemeStore((state) => state.setSchema)
    const specialty = useThemeStore((state) => state.specialty)
    const setSpecialty = useThemeStore((state) => state.setSpecialty)

    const onThemeSelect = (value: string) => {
        setThemeSchema(value)
        
        // If selecting a specialty theme, update the specialty state
        if (value === 'organ-transplant' || value === 'cosmetic-surgery') {
            setSpecialty(value as 'organ-transplant' | 'cosmetic-surgery')
        } else {
            setSpecialty('default')
        }
    }

    return (
        <div className={className}>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                    <HiOutlineColorSwatch className="text-2xl" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-3">
                        <p className="text-sm font-medium">Theme</p>
                    </div>
                    <div className="p-2">
                        {themeOptions.map((option) => (
                            <Menu.Item key={option.value}>
                                {({ active }) => (
                                    <button
                                        className={classNames(
                                            'flex items-center justify-between w-full px-4 py-2 text-sm rounded-md',
                                            (active || themeSchema === option.value) ? 'bg-primary-subtle text-primary' : 'text-gray-700 dark:text-gray-200'
                                        )}
                                        onClick={() => onThemeSelect(option.value)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="w-5 h-5 rounded-full border border-gray-200" 
                                                style={{ backgroundColor: option.color }}
                                            />
                                            <span>{option.label}</span>
                                        </div>
                                        {themeSchema === option.value && (
                                            <svg width="16" height="16" viewBox="0 0 16 16">
                                                <path
                                                    d="M6.00049 12.0003L1.50049 7.50032L2.91449 6.08632L6.00049 9.17332L13.0865 2.08632L14.5005 3.50032L6.00049 12.0003Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default ThemeIcon