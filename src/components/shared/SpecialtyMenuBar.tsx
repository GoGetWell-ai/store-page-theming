import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui'

const SpecialtyMenuBar: React.FC = () => {
    const location = useLocation()
    const { specialtyConfig, colors } = useThemeStore()

    const menuClasses = {
        floating: 'fixed top-4 left-4 right-4 z-50',
        side: 'fixed left-0 top-0 bottom-0 w-64 z-40',
        top: 'sticky top-0 z-40'
    }

    return (
        <nav 
            className={`${specialtyConfig.menuBar.style} ${menuClasses[specialtyConfig.menuBar.position]}`}
        >
            <div className={`mx-auto px-4 ${specialtyConfig.menuBar.position === 'side' ? '' : 'max-w-7xl'}`}>
                <div className={`${
                    specialtyConfig.menuBar.layout === 'vertical' || specialtyConfig.menuBar.position === 'side'
                        ? 'flex flex-col space-y-4 py-6'
                        : specialtyConfig.menuBar.layout === 'compact'
                        ? 'flex items-center justify-between h-14'
                        : 'flex items-center justify-between h-16'
                }`}>
                    <div className="flex items-center">
                        {specialtyConfig.menuBar.logo && (
                            <img 
                                src={specialtyConfig.menuBar.logo} 
                                alt="Logo" 
                                className="h-8 w-auto mr-4"
                            />
                        )}
                    </div>

                    <div className={`${
                        specialtyConfig.menuBar.layout === 'vertical' || specialtyConfig.menuBar.position === 'side'
                            ? 'flex flex-col space-y-2'
                            : 'flex space-x-4'
                    }`}>
                        {specialtyConfig.menuBar.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/80 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="solid"
                            size={specialtyConfig.menuBar.layout === 'compact' ? 'sm' : 'md'}
                            className="bg-white text-primary hover:bg-gray-100"
                        >
                            {specialtyConfig.heroSection.ctaText}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SpecialtyMenuBar 