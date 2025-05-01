export const DIR_RTL = 'rtl'
export const DIR_LTR = 'ltr'
export const MODE_LIGHT = 'light'
export const MODE_DARK = 'dark'

export const SIDE_NAV_WIDTH = 290
export const SIDE_NAV_COLLAPSED_WIDTH = 80
export const SPLITTED_SIDE_NAV_MINI_WIDTH = 80
export const STACKED_SIDE_NAV_SECONDARY_WIDTH = 270
export const SIDE_NAV_CONTENT_GUTTER = 'px-2'
export const LOGO_X_GUTTER = 'px-6'
export const HEADER_HEIGHT = 64
export const PAGE_CONTAINER_GUTTER_X = 'px-4 sm:px-6 md:px-8'
export const PAGE_CONTAINER_GUTTER_Y = 'py-4 sm:py-6 md:px-8'

export const LAYOUT_BLANK = 'blank'
export const LAYOUT_CLASSIC = 'classic'
export const LAYOUT_MODERN = 'modern'
export const LAYOUT_STACKED_SIDE = 'stackedSide'
export const LAYOUT_SIMPLE = 'simple'
export const LAYOUT_DECKED = 'decked'

export const THEME_DEFAULT = 'default'
export const THEME_ORGAN_TRANSPLANT = 'organ-transplant'
export const THEME_COSMETIC_SURGERY = 'cosmetic-surgery'

export const THEME_ENUM = {
    DIR_RTL: DIR_RTL,
    DIR_LTR: DIR_LTR,
    MODE_LIGHT: MODE_LIGHT,
    MODE_DARK: MODE_DARK,
    SIDE_NAV_WIDTH: SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH: SIDE_NAV_COLLAPSED_WIDTH,
    SPLITTED_SIDE_NAV_MINI_WIDTH: SPLITTED_SIDE_NAV_MINI_WIDTH,
    STACKED_SIDE_NAV_SECONDARY_WIDTH: STACKED_SIDE_NAV_SECONDARY_WIDTH,
    HEADER_HEIGHT: HEADER_HEIGHT,
    LAYOUT_BLANK: LAYOUT_BLANK,
    LAYOUT_CLASSIC: LAYOUT_CLASSIC,
    LAYOUT_MODERN: LAYOUT_MODERN,
    LAYOUT_STACKED_SIDE: LAYOUT_STACKED_SIDE,
    LAYOUT_SIMPLE: LAYOUT_SIMPLE,
    LAYOUT_DECKED: LAYOUT_DECKED,
    THEME_DEFAULT: THEME_DEFAULT,
    THEME_ORGAN_TRANSPLANT: THEME_ORGAN_TRANSPLANT,
    THEME_COSMETIC_SURGERY: THEME_COSMETIC_SURGERY,
} as const

export const THEME_SCHEMA = {
    DEFAULT: 'base',
    ORGAN_TRANSPLANT: 'theme1',
    COSMETIC_SURGERY: 'theme2'
}

export const LAYOUT_TYPES = {
    CLASSIC: LAYOUT_CLASSIC,
    MODERN: LAYOUT_MODERN,
    SIMPLE: LAYOUT_SIMPLE
}

export const DIRECTIONS = {
    LTR: DIR_LTR,
    RTL: DIR_RTL
}

export const MODES = {
    LIGHT: MODE_LIGHT,
    DARK: MODE_DARK
}

export const THEME_OPTIONS = [
    {
        id: 'base',
        name: 'Default Theme',
        value: THEME_DEFAULT,
        icon: 'hospital'
    },
    {
        id: 'theme1',
        name: 'Organ Transplant Theme',
        value: THEME_ORGAN_TRANSPLANT,
        icon: 'heartbeat'
    },
    {
        id: 'theme2',
        name: 'Cosmetic Surgery Theme',
        value: THEME_COSMETIC_SURGERY,
        icon: 'smile'
    }
]
