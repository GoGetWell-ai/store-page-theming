import { THEME_ENUM } from '@/constants/theme.constant'
import { Direction, Mode, ControlSize, LayoutType, SpecialtyType } from '@/@types/theme'
import { baseColors } from '@/views/Themes/themes/base/colors'
import { baseTypography } from '@/views/Themes/themes/base/typography'
import { theme1Colors } from '@/views/Themes/themes/theme1/colors'
import { theme1Typography } from '@/views/Themes/themes/theme1/typography'
import { theme2Colors } from '@/views/Themes/themes/theme2/colors'
import { theme2Typography } from '@/views/Themes/themes/theme2/typography'

export type ThemeConfig = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    controlSize: ControlSize
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
    colors: typeof baseColors
    typography: typeof baseTypography
    specialty: SpecialtyType
    specialtyConfig: {
        heroSection: {
            title: string
            description: string
            ctaText: string
        }
        menuBar: {
            style: string
            items: Array<{ label: string; path: string }>
        }
        cards: {
            style: string
            layout: string
        }
        forms: {
            style: string
            layout: string
        }
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeSchema: 'base',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_CLASSIC,
        sideNavCollapse: false,
    },
    colors: baseColors,
    typography: baseTypography,
    specialty: 'default',
    specialtyConfig: {
        heroSection: {
            title: 'Welcome to GoGetWell',
            description: 'Your trusted healthcare platform',
            ctaText: 'Get Started'
        },
        menuBar: {
            style: 'default',
            items: [
                { label: 'Home', path: '/' },
                { label: 'Themes', path: '/themes' }
            ]
        },
        cards: {
            style: 'default',
            layout: 'grid'
        },
        forms: {
            style: 'default',
            layout: 'vertical'
        }
    }
}

export const themeConfigs = {
    base: {
        colors: baseColors,
        typography: baseTypography,
        specialtyConfig: {
            heroSection: {
                title: 'Welcome to GoGetWell',
                description: 'Your trusted healthcare platform',
                ctaText: 'Get Started',
                style: 'bg-gradient-to-r from-blue-500 to-blue-700',
                layout: 'centered',
                features: ['24/7 Support', 'Expert Doctors', 'Modern Facilities']
            },
            menuBar: {
                style: 'bg-white shadow-md',
                items: [
                    { label: 'Home', path: '/' },
                    { label: 'Services', path: '/services' },
                    { label: 'About', path: '/about' },
                    { label: 'Contact', path: '/contact' }
                ],
                layout: 'horizontal',
                position: 'top',
                logo: '/images/logo-default.svg'
            },
            cards: {
                style: 'bg-white hover:shadow-lg transition-shadow',
                layout: 'grid',
                spacing: 24,
                borderRadius: '8px',
                shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                hoverEffect: 'transform scale-105'
            },
            forms: {
                style: 'space-y-4',
                layout: 'vertical',
                spacing: 16,
                inputStyle: 'outlined',
                buttonStyle: 'contained',
                inputClasses: 'rounded-md border-gray-300 focus:border-blue-500',
                labelClasses: 'text-gray-700 font-medium'
            }
        }
    },
    theme1: {
        colors: theme1Colors,
        typography: theme1Typography,
        specialtyConfig: {
            heroSection: {
                title: 'Organ Transplant Center',
                description: 'Leading the way in organ transplantation with cutting-edge technology and compassionate care',
                ctaText: 'Schedule Consultation',
                style: 'bg-gradient-to-r from-green-600 to-teal-500',
                layout: 'split',
                backgroundImage: '/images/hero-transplant.jpg',
                features: ['Advanced Surgical Techniques', 'Expert Transplant Team', 'Comprehensive Care']
            },
            menuBar: {
                style: 'bg-teal-700 text-white',
                items: [
                    { label: 'Home', path: '/' },
                    { label: 'Transplant Services', path: '/services' },
                    { label: 'Patient Resources', path: '/resources' },
                    { label: 'Success Stories', path: '/stories' },
                    { label: 'Contact', path: '/contact' }
                ],
                layout: 'horizontal',
                position: 'top',
                logo: '/images/logo-transplant.svg'
            },
            cards: {
                style: 'bg-white border-l-4 border-teal-500',
                layout: 'list',
                spacing: 32,
                borderRadius: '4px',
                shadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                hoverEffect: 'transform translateX(8px)'
            },
            forms: {
                style: 'space-y-6',
                layout: 'horizontal',
                spacing: 24,
                inputStyle: 'filled',
                buttonStyle: 'contained',
                inputClasses: 'rounded-none border-b-2 border-teal-500 focus:border-teal-700',
                labelClasses: 'text-teal-700 font-bold'
            }
        }
    },
    theme2: {
        colors: theme2Colors,
        typography: theme2Typography,
        specialtyConfig: {
            heroSection: {
                title: 'Transform with Confidence',
                description: 'Experience the art of cosmetic surgery with our expert team',
                ctaText: 'Book Your Consultation',
                style: 'bg-gradient-to-r from-purple-500 to-pink-500',
                layout: 'full-width',
                backgroundImage: '/images/hero-cosmetic.jpg',
                features: ['Virtual Consultations', 'Advanced Procedures', 'Natural Results']
            },
            menuBar: {
                style: 'bg-white/80 backdrop-blur-md border-b border-purple-100',
                items: [
                    { label: 'Home', path: '/' },
                    { label: 'Procedures', path: '/procedures' },
                    { label: 'Before & After', path: '/gallery' },
                    { label: 'Patient Stories', path: '/stories' },
                    { label: 'Contact', path: '/contact' }
                ],
                layout: 'horizontal',
                position: 'floating',
                logo: '/images/logo-cosmetic.svg'
            },
            cards: {
                style: 'bg-white/80 backdrop-blur-sm',
                layout: 'masonry',
                spacing: 24,
                borderRadius: '16px',
                shadow: '0 8px 16px rgba(124, 58, 237, 0.1)',
                hoverEffect: 'transform scale-102 rotate-1'
            },
            forms: {
                style: 'space-y-8',
                layout: 'vertical',
                spacing: 20,
                inputStyle: 'minimal',
                buttonStyle: 'text',
                inputClasses: 'rounded-full border-purple-200 focus:border-purple-500',
                labelClasses: 'text-purple-700 font-light tracking-wide'
            }
        }
    }
}
