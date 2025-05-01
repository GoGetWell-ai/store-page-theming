import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
    Theme,
    LayoutType,
    Direction,
    ThemeSpecialty,
} from '@/@types/theme'
import baseColors from '@/views/Home/themes/base/colors'
import { theme1Colors, theme1Typography } from '@/views/Home/themes/theme1'
import { theme2Colors, theme2Typography } from '@/views/Home/themes/theme2'
import { baseTypography } from '@/views/Home/themes/base'

type ThemeState = Theme

type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (specialty: ThemeState['specialty']) => void
    reset: () => void
}

const createDefaultTheme = (): ThemeState => ({
    specialty: 'default',
    colors: baseColors,
    typography: baseTypography,
    ...themeConfig,
    mode: themeConfig.mode,
})

// Default theme settings
const defaultTheme: ThemeState = createDefaultTheme()

// Organ transplant theme
const organTransplantTheme: Partial<ThemeState> = {
    specialty: 'organTransplant',
    typography: theme1Typography,
}

// Cosmetic surgery theme
const cosmeticSurgeryTheme: Partial<ThemeState> = {
    specialty: 'cosmeticSurgery',
    typography: theme2Typography,
}

const getThemeBySpecialty = (specialty: ThemeSpecialty): ThemeState => {
    switch (specialty) {
        case 'organTransplant':
            return { ...defaultTheme, ...organTransplantTheme } as ThemeState
        case 'cosmeticSurgery':
            return { ...defaultTheme, ...cosmeticSurgeryTheme } as ThemeState
        default:
            return defaultTheme
    }
}

export const getThemeColors = (specialty: ThemeSpecialty) => {
    switch (specialty) {
        case 'organTransplant':
            return theme1Colors[defaultTheme.mode || 'light']
        case 'cosmeticSurgery':
            return theme2Colors[defaultTheme.mode || 'light']
        default:
            return baseColors[defaultTheme.mode || 'light']
    }
}

const initialTheme = getThemeBySpecialty(defaultTheme.specialty)
export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
            ...initialTheme,
            setSchema: (payload) => set(() => ({ themeSchema: payload })),
            setMode: (payload) => set(() => ({ mode: payload })),
            setSideNavCollapse: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, sideNavCollapse: payload },
                })),
            setDirection: (payload) => set(() => ({ direction: payload })),
            setPanelExpand: (payload) => set(() => ({ panelExpand: payload })),
            setLayout: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, type: payload },
                })),
            setPreviousLayout: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, previousType: payload },
                })),
            specialty: 'default',
            setSpecialty: (specialty) =>
                set((state) => ({
                    ...state,
                    ...getThemeBySpecialty(specialty),
                })),
            reset: () => set(createDefaultTheme()),
        }),
        {
            name: 'theme',
        },
    ),
)
