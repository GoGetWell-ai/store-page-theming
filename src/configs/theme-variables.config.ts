import { SpecialtyType, Mode } from '@/@types/theme'

type ThemeColors = {
    primary: string
    'primary-deep': string
    'primary-mild': string
    'primary-subtle': string
    secondary: string
    'secondary-deep': string
    'secondary-mild': string
    'secondary-subtle': string
    accent: string
    neutral: string
    background: string
    'text-primary': string
    'text-secondary': string
    'text-accent': string
    'border-color': string
    'card-bg': string
    'button-bg': string
    'button-text': string
    'input-bg': string
    'input-text': string
    'hero-bg': string
    'hero-text': string
}

type ThemeTypography = {
    family: string
    'heading-family': string
    'base-size': string
    'heading-size': string
    'heading-weight': string
    'body-weight': string
    'line-height': string
}

type ThemeSpacing = {
    base: string
    small: string
    medium: string
    large: string
    'section-padding': string
    'card-padding': string
    'button-padding': string
    'input-padding': string
}

type ThemeVariables = {
    colors: ThemeColors
    typography: ThemeTypography
    spacing: ThemeSpacing
}

type ThemeConfig = {
    [key in SpecialtyType]: {
        [key in Mode]: ThemeVariables
    }
}

export const themeVariables: ThemeConfig = {
    'default': {
        light: {
            colors: {
                primary: '#2a85ff',
                'primary-deep': '#0069f6',
                'primary-mild': '#4996ff',
                'primary-subtle': '#2a85ff1a',
                secondary: '#5d5fef',
                'secondary-deep': '#4a4cbe',
                'secondary-mild': '#7e80f1',
                'secondary-subtle': '#5d5fef1a',
                accent: '#00c8ff',
                neutral: '#ffffff',
                background: '#f5f5f7',
                'text-primary': '#1a1d1f',
                'text-secondary': '#6f767e',
                'text-accent': '#2a85ff',
                'border-color': '#e6e8ec',
                'card-bg': '#ffffff',
                'button-bg': '#2a85ff',
                'button-text': '#ffffff',
                'input-bg': '#ffffff',
                'input-text': '#1a1d1f',
                'hero-bg': '#2a85ff',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Inter, sans-serif',
                'heading-family': 'Inter, sans-serif',
                'base-size': '16px',
                'heading-size': '24px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.5'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '64px',
                'card-padding': '24px',
                'button-padding': '12px 24px',
                'input-padding': '12px 16px'
            }
        },
        dark: {
            colors: {
                primary: '#2a85ff',
                'primary-deep': '#0069f6',
                'primary-mild': '#4996ff',
                'primary-subtle': '#2a85ff1a',
                secondary: '#5d5fef',
                'secondary-deep': '#4a4cbe',
                'secondary-mild': '#7e80f1',
                'secondary-subtle': '#5d5fef1a',
                accent: '#00c8ff',
                neutral: '#111827',
                background: '#1a1d1f',
                'text-primary': '#ffffff',
                'text-secondary': '#9a9fa5',
                'text-accent': '#2a85ff',
                'border-color': '#272b30',
                'card-bg': '#111827',
                'button-bg': '#2a85ff',
                'button-text': '#ffffff',
                'input-bg': '#272b30',
                'input-text': '#ffffff',
                'hero-bg': '#1a1d1f',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Inter, sans-serif',
                'heading-family': 'Inter, sans-serif',
                'base-size': '16px',
                'heading-size': '24px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.5'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '64px',
                'card-padding': '24px',
                'button-padding': '12px 24px',
                'input-padding': '12px 16px'
            }
        }
    },
    'organ-transplant': {
        light: {
            colors: {
                primary: '#0CAF60',
                'primary-deep': '#088d50',
                'primary-mild': '#34c779',
                'primary-subtle': '#0CAF601a',
                secondary: '#3b82f6',
                'secondary-deep': '#2563eb',
                'secondary-mild': '#60a5fa',
                'secondary-subtle': '#3b82f61a',
                accent: '#f59e0b',
                neutral: '#ffffff',
                background: '#f0fdf4',
                'text-primary': '#1a1d1f',
                'text-secondary': '#6f767e',
                'text-accent': '#0CAF60',
                'border-color': '#e6e8ec',
                'card-bg': '#ffffff',
                'button-bg': '#0CAF60',
                'button-text': '#ffffff',
                'input-bg': '#ffffff',
                'input-text': '#1a1d1f',
                'hero-bg': '#0CAF60',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Roboto, sans-serif',
                'heading-family': 'Montserrat, sans-serif',
                'base-size': '16px',
                'heading-size': '28px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.6'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '72px',
                'card-padding': '24px',
                'button-padding': '14px 28px',
                'input-padding': '12px 16px'
            }
        },
        dark: {
            colors: {
                primary: '#0CAF60',
                'primary-deep': '#088d50',
                'primary-mild': '#34c779',
                'primary-subtle': '#0CAF601a',
                secondary: '#3b82f6',
                'secondary-deep': '#2563eb',
                'secondary-mild': '#60a5fa',
                'secondary-subtle': '#3b82f61a',
                accent: '#f59e0b',
                neutral: '#111827',
                background: '#0f172a',
                'text-primary': '#ffffff',
                'text-secondary': '#9a9fa5',
                'text-accent': '#0CAF60',
                'border-color': '#272b30',
                'card-bg': '#1e293b',
                'button-bg': '#0CAF60',
                'button-text': '#ffffff',
                'input-bg': '#272b30',
                'input-text': '#ffffff',
                'hero-bg': '#0f172a',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Roboto, sans-serif',
                'heading-family': 'Montserrat, sans-serif',
                'base-size': '16px',
                'heading-size': '28px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.6'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '72px',
                'card-padding': '24px',
                'button-padding': '14px 28px',
                'input-padding': '12px 16px'
            }
        }
    },
    'cosmetic-surgery': {
        light: {
            colors: {
                primary: '#f472b6',
                'primary-deep': '#db2777',
                'primary-mild': '#f9a8d4',
                'primary-subtle': '#f472b61a',
                secondary: '#8b5cf6',
                'secondary-deep': '#7c3aed',
                'secondary-mild': '#a78bfa',
                'secondary-subtle': '#8b5cf61a',
                accent: '#06b6d4',
                neutral: '#ffffff',
                background: '#fdf2f8',
                'text-primary': '#1a1d1f',
                'text-secondary': '#6f767e',
                'text-accent': '#f472b6',
                'border-color': '#e6e8ec',
                'card-bg': '#ffffff',
                'button-bg': '#f472b6',
                'button-text': '#ffffff',
                'input-bg': '#ffffff',
                'input-text': '#1a1d1f',
                'hero-bg': '#f472b6',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Poppins, sans-serif',
                'heading-family': 'Playfair Display, serif',
                'base-size': '16px',
                'heading-size': '32px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.7'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '80px',
                'card-padding': '28px',
                'button-padding': '14px 32px',
                'input-padding': '14px 18px'
            }
        },
        dark: {
            colors: {
                primary: '#f472b6',
                'primary-deep': '#db2777',
                'primary-mild': '#f9a8d4',
                'primary-subtle': '#f472b61a',
                secondary: '#8b5cf6',
                'secondary-deep': '#7c3aed',
                'secondary-mild': '#a78bfa',
                'secondary-subtle': '#8b5cf61a',
                accent: '#06b6d4',
                neutral: '#111827',
                background: '#1e1e2f',
                'text-primary': '#ffffff',
                'text-secondary': '#9a9fa5',
                'text-accent': '#f472b6',
                'border-color': '#272b30',
                'card-bg': '#2d2d3f',
                'button-bg': '#f472b6',
                'button-text': '#ffffff',
                'input-bg': '#272b30',
                'input-text': '#ffffff',
                'hero-bg': '#1e1e2f',
                'hero-text': '#ffffff'
            },
            typography: {
                family: 'Poppins, sans-serif',
                'heading-family': 'Playfair Display, serif',
                'base-size': '16px',
                'heading-size': '32px',
                'heading-weight': '700',
                'body-weight': '400',
                'line-height': '1.7'
            },
            spacing: {
                base: '16px',
                small: '8px',
                medium: '24px',
                large: '32px',
                'section-padding': '80px',
                'card-padding': '28px',
                'button-padding': '14px 32px',
                'input-padding': '14px 18px'
            }
        }
    }
}
