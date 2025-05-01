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

export type SpecialtyType = 'default' | 'organ-transplant' | 'cosmetic-surgery'

export type Theme = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    specialty: SpecialtyType
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType | ''
    }
}
