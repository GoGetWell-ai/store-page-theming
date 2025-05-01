export type Direction = 'ltr' | 'rtl';
export type Mode = 'light' | 'dark';
export type ControlSize = 'lg' | 'md' | 'sm';
export type LayoutType =
    | 'blank'
    | 'collapsibleSide'
    | 'stackedSide'
    | 'topBarClassic'
    | 'framelessSide'
    | 'contentOverlay';

export type ThemeSpecialty = 'default' | 'theme1' | 'theme2'; // Specialty themes

export interface ThemeConfig {
    themeSchema: string;
    direction: Direction;
    mode: Mode;
    panelExpand: boolean;
    controlSize: ControlSize;
    layout: {
        type: LayoutType;
        sideNavCollapse: boolean;
    };
}

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

export interface ThemeStore {
    specialty: ThemeSpecialty;
    theme: ThemeConfig;
    setSpecialty: (specialty: ThemeSpecialty) => void;
    setSchema: (payload: string) => void;
    setMode: (payload: Mode) => void;
    setDirection: (payload: Direction) => void;
    setPanelExpand: (payload: boolean) => void;
    setLayout: (payload: LayoutType) => void;
    setSideNavCollapse: (payload: boolean) => void;
}

export type Theme = ThemeConfig; // Alias for consistency