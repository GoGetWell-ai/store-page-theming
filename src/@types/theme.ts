export type Direction = 'ltr' | 'rtl'
export type Mode = 'light' | 'dark'
export type ControlSize = 'lg' | 'md' | 'sm'
export type ThemeSpecialty = 'default' | 'organTransplant' | 'cosmeticSurgery'

export interface ThemeColors {
    light: {
        primary: string
        primaryDeep: string
        primaryMild: string
        secondary: string
        secondaryDeep: string
        secondaryMild: string
        accent: string
        background: string
        text: string
        heading: string
    }
    dark: {
        primary: string
        primaryDeep: string
        primaryMild: string
        secondary: string
        secondaryDeep: string
        secondaryMild: string
        accent: string
        background: string
        text: string
        heading: string
    }
}

export interface ThemeTypography {
    fontFamily: string
    headingSize: string
    bodySize: string
}

export type LayoutType =
    | 'blank'
    | 'collapsibleSide'
    | 'stackedSide'
    | 'topBarClassic'
    | 'framelessSide'
    | 'contentOverlay'

export type Theme = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType | ''
    }
    specialty: ThemeSpecialty
    colors: ThemeColors
    typography: ThemeTypography
}

export interface ThemeActions {
    setMode: (mode: Theme['mode']) => void
    setSpecialty: (specialty: Theme['specialty']) => void
    reset: () => void
}
