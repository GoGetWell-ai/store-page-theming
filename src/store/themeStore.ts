import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, LayoutType, Direction } from '@/@types/theme'
import { baseColors } from '@/views/Themes/themes/base/colors'
import { baseTypography } from '@/views/Themes/themes/base/typography'
import { theme1Colors } from '@/views/Themes/themes/theme1/colors'
import { theme1Typography } from '@/views/Themes/themes/theme1/typography'
import { theme2Colors } from '@/views/Themes/themes/theme2/colors'
import { theme2Typography } from '@/views/Themes/themes/theme2/typography'
import { LAYOUT_CLASSIC } from '@/constants/theme.constant'

type ThemeState = Theme & {
    colors: typeof baseColors
    typography: typeof baseTypography
    themeSchema: string
    layoutType: string
    specialty: 'default' | 'organ-transplant' | 'cosmetic-surgery'
    specialtyConfig: {
        heroSection: {
            title: string
            description: string
            ctaText: string
            style: string
            layout: 'centered' | 'split' | 'full-width'
            backgroundImage?: string
            features?: string[]
        }
        menuBar: {
            style: string
            items: Array<{ label: string; path: string }>
            layout: 'horizontal' | 'vertical' | 'compact'
            position: 'top' | 'side' | 'floating'
            logo?: string
        }
        cards: {
            style: string
            layout: 'grid' | 'list' | 'masonry'
            spacing: number
            borderRadius: string
            shadow: string
            hoverEffect: string
        }
        forms: {
            style: string
            layout: 'vertical' | 'horizontal' | 'inline'
            spacing: number
            inputStyle: 'outlined' | 'filled' | 'minimal'
            buttonStyle: 'contained' | 'outlined' | 'text'
            inputClasses: string
            labelClasses: string
        }
    }
}

type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (payload: ThemeState['specialty']) => void
}

const initialThemeState: ThemeState = {
    themeSchema: 'base',
    direction: 'ltr',
    mode: 'light',
    panelExpand: false,
    layoutType: LAYOUT_CLASSIC,
    colors: baseColors,
    typography: baseTypography,
    specialty: 'default',
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
}

const themeMap = {
    base: {
        colors: baseColors,
        typography: baseTypography,
        specialtyConfig: initialThemeState.specialtyConfig
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

export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
            ...initialThemeState,
            setSchema: (payload) => {
                const theme = themeMap[payload]
                set(() => ({
                    themeSchema: payload,
                    colors: theme.colors,
                    typography: theme.typography,
                    specialtyConfig: theme.specialtyConfig
                }))
            },
            setMode: (payload) => set(() => ({ mode: payload })),
            setSideNavCollapse: (payload) =>
                set((state) => ({
                    layout: {
                        ...state.layout,
                        sideNavCollapse: payload,
                    },
                })),
            setDirection: (payload) => set(() => ({ direction: payload })),
            setPanelExpand: (payload) => set(() => ({ panelExpand: payload })),
            setLayout: (payload) =>
                set((state) => ({
                    layout: {
                        ...state.layout,
                        type: payload,
                        previousType: state.layout.type,
                    },
                })),
            setPreviousLayout: (payload) =>
                set((state) => ({
                    layout: {
                        ...state.layout,
                        previousType: payload,
                    },
                })),
            setSpecialty: (payload) => {
                const theme = themeMap[payload === 'organ-transplant' ? 'theme1' : payload === 'cosmetic-surgery' ? 'theme2' : 'base']
                set(() => ({
                    specialty: payload,
                    colors: theme.colors,
                    typography: theme.typography,
                    specialtyConfig: theme.specialtyConfig
                }))
            }
        }),
        {
            name: 'theme',
        }
    )
)
