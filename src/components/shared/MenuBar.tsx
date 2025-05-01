import HeaderLogo from '@/components/template/HeaderLogo'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'

const MenuBar: React.FC = () => {
    const location = useLocation()

    return (
        <nav className="bg-card-bg border-b border-border-color shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <HeaderLogo />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    location.pathname === '/'
                                        ? 'border-primary text-text-primary'
                                        : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/themes"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    location.pathname === '/themes'
                                        ? 'border-primary text-text-primary'
                                        : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Themes
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <ThemeSelector />
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        to="/"
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            location.pathname === '/'
                                ? 'bg-primary-subtle border-primary text-primary'
                                : 'border-transparent text-text-secondary hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/themes"
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                            location.pathname === '/themes'
                                ? 'bg-primary-subtle border-primary text-primary'
                                : 'border-transparent text-text-secondary hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Themes
                    </Link>
                    <div className="pl-3 pr-4 py-2">
                        <ThemeSelector />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuBar
