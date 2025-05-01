export type Direction = 'ltr' | 'rtl'
export type Mode = 'light' | 'dark'
export type ControlSize = 'lg' | 'md' | 'sm'
export type LayoutType =
    | 'blank'
    | 'classic'
    | 'modern'
    | 'stackedSide'
    | 'simple'
    | 'decked'

export type SpecialtyType = 'default' | 'organ-transplant' | 'cosmetic-surgery'

export type HeroSectionConfig = {
    title: string
    description: string
    ctaText: string
}

export type MenuBarConfig = {
    style: string
    items: Array<{ label: string; path: string }>
}

export type CardsConfig = {
    style: string
    layout: 'grid' | 'list'
}

export type FormsConfig = {
    style: string
    layout: 'vertical' | 'horizontal'
}

export type SpecialtyConfig = {
    heroSection: {
        title: string
        description: string
        ctaText: string
        style: string
        backgroundImage?: string
        layout: 'centered' | 'split' | 'full-width'
    }
    menuBar: {
        style: string
        items: Array<{ label: string; path: string }>
        layout: 'horizontal' | 'vertical' | 'compact'
        position: 'top' | 'side' | 'floating'
    }
    cards: {
        style: string
        layout: 'grid' | 'list' | 'masonry'
        spacing: number
        borderRadius: string
        shadow: string
    }
    forms: {
        style: string
        layout: 'vertical' | 'horizontal' | 'inline'
        spacing: number
        inputStyle: 'outlined' | 'filled' | 'minimal'
        buttonStyle: 'contained' | 'outlined' | 'text'
    }
    buttons: {
        style: string
        size: 'sm' | 'md' | 'lg'
        variant: 'contained' | 'outlined' | 'text'
        borderRadius: string
    }
    marketing: {
        tagline: string
        valueProps: string[]
        testimonials: Array<{
            quote: string
            author: string
            role: string
        }>
    }
    spacing: {
        section: string
        component: string
        element: string
    }
    animations: {
        hover: string
        transition: string
    }
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
    colors: {
        primary: {
            main: string
            light: string
            dark: string
            contrastText: string
        }
        secondary: {
            main: string
            light: string
            dark: string
            contrastText: string
        }
        background: {
            default: string
            paper: string
        }
        text: {
            primary: string
            secondary: string
        }
    }
    typography: {
        fontFamily: string
        h1: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        h2: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        h3: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        h4: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        h5: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        h6: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        body1: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
        body2: {
            fontSize: string
            fontWeight: number
            lineHeight: number
        }
    }
    specialty: SpecialtyType
    specialtyConfig: SpecialtyConfig
}
