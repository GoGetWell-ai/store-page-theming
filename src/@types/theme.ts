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
}

export type SpecialtyTheme = {
  primary: string
  'primary-deep': string
  'primary-mild': string
  font: string
}

export type TypographyTheme = {
  fontFamily: string
  headings: {
    fontSize: string
    fontWeight: number
    lineHeight: string
  }
  body: {
    fontSize: string
    fontWeight: number
    lineHeight: string
  }
}

export type FullSpecialtyTheme = {
  color: SpecialtyTheme
  typography: TypographyTheme
}
