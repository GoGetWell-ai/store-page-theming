// filepath: c:\Users\HP\Desktop\Practice\store-page-theming-assignment2\src\configs\specialty-themes.config.ts
import { ThemeConfig } from '@/@types/theme'

// Default Medical Theme (General Practice)
export const defaultTheme: ThemeConfig = {
    colors: {
        primary: '#1976d2',      // Blue - representing trust and professionalism
        secondary: '#90caf9',
        accent: '#4dabf5',
        background: '#ffffff',
        text: '#212121',
        success: '#4caf50',
        warning: '#ff9800',
        danger: '#f44336',
        info: '#2196f3',
        muted: '#9e9e9e'
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        headings: {
            fontWeight: '500',
            lineHeight: '1.2'
        },
        body: {
            fontSize: '1rem',
            lineHeight: '1.5'
        }
    },
    spacing: {
        base: '1rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem'
    },
    borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        full: '9999px'
    }
}

// Organ Transplant Theme
export const organTransplantTheme: ThemeConfig = {
    colors: {
        primary: '#006064',      // Dark Teal - representing medical specialization
        secondary: '#4dd0e1',
        accent: '#00acc1',
        background: '#f5f5f5',
        text: '#263238',
        success: '#00897b',
        warning: '#ffa000',
        danger: '#d32f2f',
        info: '#0288d1',
        muted: '#78909c'
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        headings: {
            fontWeight: '500',
            lineHeight: '1.2'
        },
        body: {
            fontSize: '1rem',
            lineHeight: '1.5'
        }
    },
    spacing: {
        base: '1rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem'
    },
    borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        full: '9999px'
    }
}

// Cosmetic Surgery Theme
export const cosmeticSurgeryTheme: ThemeConfig = {
    colors: {
        primary: '#ad1457',      // Pink/Purple - representing aesthetics and cosmetic focus
        secondary: '#f48fb1',
        accent: '#ec407a',
        background: '#fafafa',
        text: '#424242',
        success: '#66bb6a',
        warning: '#ffb74d',
        danger: '#e57373',
        info: '#64b5f6',
        muted: '#bdbdbd'
    },
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
        headings: {
            fontWeight: '600',
            lineHeight: '1.3'
        },
        body: {
            fontSize: '1rem',
            lineHeight: '1.6'
        }
    },
    spacing: {
        base: '1rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem'
    },
    borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.75rem',
        full: '9999px'
    }
}