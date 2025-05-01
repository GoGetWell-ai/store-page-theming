export type Direction = 'ltr' | 'rtl'
export type Mode = 'light' | 'dark'
export type ControlSize = 'lg' | 'md' | 'sm'
export type LayoutType =
    | 'blank'
    | 'collapsibleSide'
    | 'stackedSide'
    | 'topBarClassic'
    | 'framelessSide'
    | 'contentOverlay'

export type ThemeSpecialty = 'default' | 'organTransplant' | 'cosmeticSurgery'

export type ThemeColors = {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    success: string
    warning: string
    danger: string
    info: string
    muted: string
}

export type ThemeTypography = {
    fontFamily: string
    headings: {
        fontWeight: string
        lineHeight: string
    }
    body: {
        fontSize: string
        lineHeight: string
    }
}

export type ThemeSpacing = {
    base: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
}

export type ThemeBorderRadius = {
    none: string
    sm: string
    md: string
    lg: string
    full: string
}

export type ThemeConfig = {
    colors: ThemeColors
    typography: ThemeTypography
    spacing: ThemeSpacing
    borderRadius: ThemeBorderRadius
}

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
    config: ThemeConfig
}
