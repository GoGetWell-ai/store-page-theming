import { THEME_ENUM } from '@/constants/theme.constant'
import { Direction, Mode, ControlSize, LayoutType } from '@/@types/theme'
import { defaultTheme } from '@/views/Home/themes/base/color'
import { cardiologyTheme } from '@/views/Home/themes/theme1/color'
import { cosmetologyTheme } from '@/views/Home/themes/theme2/color'

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

           
export type Variables = 
  | "primary"
  | "primaryDeep"
  | "primaryMild"
  | "primarySubtle"
  | "neutral";

export type ThemeVariables = Record<
  "light" | "dark", 
  Record<Variables, string>
>
  
const presetThemeSchemaConfig: Record<string, ThemeVariables> = {
    default: defaultTheme,
    theme1: cardiologyTheme,
    theme2: cosmetologyTheme,
}

export default presetThemeSchemaConfig