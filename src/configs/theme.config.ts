import { THEME_ENUM } from '@/constants/theme.constant';
import { Direction, Mode, ControlSize, LayoutType, ThemeSpecialty } from '@/@types/theme';

export type ThemeConfig = {
    themeSchema: string;
    direction: Direction;
    mode: Mode;
    panelExpand: boolean;
    controlSize: ControlSize;
    layout: {
        type: LayoutType;
        sideNavCollapse: boolean;
    };
};

/**
 * Configuration for specialty-specific themes.
 */
export interface SpecialtyThemeConfig {
    specialty: ThemeSpecialty;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    typography: {
        fontFamily: string;
        fontSize: {
            h1: string;
            h2: string;
            body: string;
        };
        fontWeight: {
            bold: number;
            regular: number;
        };
    };
    button: {
        borderRadius: string;
        padding: string;
    };
    marketingCopy: {
        heroTitle: string;
        heroSubtitle: string;
    };
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const globalThemeConfig: ThemeConfig = {
    themeSchema: '',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
};

/**
 * Specialty-specific theme configurations.
 */
export const themes: Record<ThemeSpecialty, SpecialtyThemeConfig> = {
    default: {
        specialty: 'default',
        colors: {
            primary: '#6B48FF', // Purple
            secondary: '#FF48B0', // Pink
            background: '#FFFFFF',
            text: '#333333',
            accent: '#00C4FF',
        },
        typography: {
            fontFamily: 'Inter, sans-serif',
            fontSize: {
                h1: '2.25rem',
                h2: '1.5rem',
                body: '1rem',
            },
            fontWeight: {
                bold: 700,
                regular: 400,
            },
        },
        button: {
            borderRadius: '0.375rem',
            padding: '0.5rem 1rem',
        },
        marketingCopy: {
            heroTitle: 'We Handle Everything, You Focus on Healing',
            heroSubtitle: 'Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language',
        },
    },
    theme1: { // Organ Transplant
        specialty: 'theme1',
        colors: {
            primary: '#2E7D32', // Green
            secondary: '#4CAF50',
            background: '#F5F5F5',
            text: '#212121',
            accent: '#FFCA28',
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: {
                h1: '2.5rem',
                h2: '1.75rem',
                body: '1.1rem',
            },
            fontWeight: {
                bold: 600,
                regular: 400,
            },
        },
        button: {
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
        },
        marketingCopy: {
            heroTitle: 'Life-Saving Organ Transplants',
            heroSubtitle: 'Find the best organ transplant options and care plans tailored for you.',
        },
    },
    theme2: { // Cosmetic Surgery
        specialty: 'theme2',
        colors: {
            primary: '#D81B60', // Pink
            secondary: '#F06292',
            background: '#FAFAFA',
            text: '#1A1A1A',
            accent: '#AB47BC',
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: {
                h1: '2rem',
                h2: '1.25rem',
                body: '0.95rem',
            },
            fontWeight: {
                bold: 600,
                regular: 300,
            },
        },
        button: {
            borderRadius: '0.25rem',
            padding: '0.5rem 1.25rem',
        },
        marketingCopy: {
            heroTitle: 'Transform Your Beauty',
            heroSubtitle: 'Explore top cosmetic surgery treatments for a confident new you.',
        },
    },
};