import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from '@/components/shared/ThemeSelector'
import { useThemeStore } from '@/store/themeStore'

const MenuBar: React.FC = () => {
    const location = useLocation()
    const { specialty } = useThemeStore()

    return (
        <header className="hero-overlay text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <div className="text-2xl font-bold">
                            {specialty === 'organTransplant'
                                ? 'Transplant Center'
                                : specialty === 'cosmeticSurgery'
                                  ? 'Beauty Clinic'
                                  : 'Healthcare Portal'}
                        </div>
                        <nav className="ml-10 flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === '/'
                                        ? 'bg-primary-deep'
                                        : 'hover:bg-primary-deep hover:bg-opacity-70'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="#services"
                                className={`px-3 py-2 rounded-md text-sm font-medium`}
                            >
                                Services
                            </Link>
                            <Link
                                to="#doctors"
                                className={`px-3 py-2 rounded-md text-sm font-medium`}
                            >
                                Doctors
                            </Link>

                            <Link
                                to="/themes"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === '/themes'
                                        ? 'bg-primary-deep'
                                        : 'hover:bg-primary-deep hover:bg-opacity-70'
                                }`}
                            >
                                Themes
                            </Link>
                        </nav>
                    </div>
                    <ThemeSelector />
                </div>
            </div>
        </header>
    )
}

export default MenuBar
