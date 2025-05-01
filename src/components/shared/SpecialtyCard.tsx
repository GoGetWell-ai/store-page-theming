import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Card, Button } from '@/components/ui'

interface SpecialtyCardProps {
    title: string
    description: string
    image?: string
    action?: {
        label: string
        onClick: () => void
    }
    features?: string[]
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({
    title,
    description,
    image,
    action,
    features
}) => {
    const { specialtyConfig, colors, typography } = useThemeStore()

    return (
        <Card
            className={`overflow-hidden transition-all duration-300 ${specialtyConfig.cards.style}`}
            style={{
                borderRadius: specialtyConfig.cards.borderRadius,
                boxShadow: specialtyConfig.cards.shadow,
                transform: 'translateZ(0)', // Enable hardware acceleration
            }}
        >
            {image && (
                <div 
                    className="relative h-48 overflow-hidden"
                    style={{
                        borderTopLeftRadius: specialtyConfig.cards.borderRadius,
                        borderTopRightRadius: specialtyConfig.cards.borderRadius,
                    }}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                </div>
            )}
            
            <div className="p-6 space-y-4">
                <h3
                    className="text-xl font-semibold"
                    style={{
                        fontFamily: typography.fontFamily,
                        fontSize: typography.h3.fontSize,
                        fontWeight: typography.h3.fontWeight,
                        lineHeight: typography.h3.lineHeight,
                        color: colors.text.primary,
                    }}
                >
                    {title}
                </h3>
                
                <p
                    className="text-base"
                    style={{
                        fontFamily: typography.fontFamily,
                        fontSize: typography.body2.fontSize,
                        lineHeight: typography.body2.lineHeight,
                        color: colors.text.secondary,
                    }}
                >
                    {description}
                </p>

                {features && features.length > 0 && (
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li 
                                key={index}
                                className="flex items-center text-sm"
                                style={{ color: colors.text.secondary }}
                            >
                                <svg 
                                    className="w-4 h-4 mr-2 flex-shrink-0" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}

                {action && (
                    <div className="pt-4">
                        <Button
                            variant="solid"
                            className="w-full"
                            onClick={action.onClick}
                            style={{
                                backgroundColor: colors.primary.main,
                                color: colors.primary.contrastText,
                            }}
                        >
                            {action.label}
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default SpecialtyCard 