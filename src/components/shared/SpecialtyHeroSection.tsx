import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Button } from '@/components/ui'

const SpecialtyHeroSection: React.FC = () => {
    const { specialtyConfig, colors, typography } = useThemeStore()

    return (
        <div
            className={`relative min-h-[600px] flex items-center ${specialtyConfig.heroSection.style}`}
            style={{
                backgroundImage: specialtyConfig.heroSection.backgroundImage 
                    ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${specialtyConfig.heroSection.backgroundImage})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${
                specialtyConfig.heroSection.layout === 'split' ? 'grid grid-cols-2 gap-8' :
                specialtyConfig.heroSection.layout === 'full-width' ? 'text-center' :
                'flex flex-col items-center text-center'
            }`}>
                <div className={`space-y-8 ${specialtyConfig.heroSection.layout === 'split' ? 'pr-8' : ''}`}>
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                        style={{
                            fontFamily: typography.fontFamily,
                            lineHeight: typography.h1.lineHeight,
                        }}
                    >
                        {specialtyConfig.heroSection.title}
                    </h1>
                    <p
                        className="text-xl sm:text-2xl text-white/90"
                        style={{
                            fontFamily: typography.fontFamily,
                            lineHeight: typography.body1.lineHeight,
                        }}
                    >
                        {specialtyConfig.heroSection.description}
                    </p>
                    
                    {specialtyConfig.heroSection.features && (
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/80">
                            {specialtyConfig.heroSection.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                        <Button
                            variant="solid"
                            size="lg"
                            className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
                        >
                            {specialtyConfig.heroSection.ctaText}
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="border-white text-white hover:bg-white/10 px-8 py-3"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
                
                {specialtyConfig.heroSection.layout === 'split' && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                        <div className="relative p-8">
                            {/* Add theme-specific content here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpecialtyHeroSection 