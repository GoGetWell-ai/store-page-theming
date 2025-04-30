import { THEME_ENUM } from '@/constants/theme.constant'
import { Direction, Mode, ControlSize, LayoutType, FullSpecialtyTheme } from '@/@types/theme'
import { organTransplantColors } from '@/views/Home/themes/organ-transplant/colors'
import { cosmeticSurgeryColors } from '@/views/Home/themes/cosmetic-surgery/colors'
import { organTransplantTypography } from '@/views/Home/themes/organ-transplant/typography'
import { cosmeticSurgeryTypography } from '@/views/Home/themes/cosmetic-surgery/typography'

export type ThemeConfig = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    controlSize: ControlSize
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeSchema: '',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
}

export const specialtyThemes: Record<'organ-transplant' | 'cosmetic-surgery', FullSpecialtyTheme> = {
  'organ-transplant': {
    color: organTransplantColors,
    typography: organTransplantTypography,
  },
  'cosmetic-surgery': {
    color: cosmeticSurgeryColors,
    typography: cosmeticSurgeryTypography,
  },
}
