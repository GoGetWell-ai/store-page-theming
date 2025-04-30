import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
    Theme,
    LayoutType,
    Direction,
    ThemeSpecialty,
    ThemeConfig,
} from '@/@types/theme'
import {
    defaultTheme,
    organTransplantTheme,
    cosmeticSurgeryTheme,
} from '@/configs/specialty-themes.config'

type ThemeState = Theme

type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (payload: ThemeSpecialty) => void
}

// Extend the initial theme state with specialty and config
const initialThemeState: ThemeState = {
    ...themeConfig,
    specialty: 'default',
    config: defaultTheme,
}

// Create a map of specialty themes for easier access
const specialtyThemes: Record<ThemeSpecialty, ThemeConfig> = {
    default: defaultTheme,
    organTransplant: organTransplantTheme,
    cosmeticSurgery: cosmeticSurgeryTheme,
}

export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
            ...initialThemeState,
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
            // New action to change theme specialty
            setSpecialty: (payload) =>
                set(() => ({
                    specialty: payload,
                    config: specialtyThemes[payload],
                })),
        }),
        {
            name: 'theme',
            // Only persist the relevant theme state
            partialize: (state) => ({
                themeSchema: state.themeSchema,
                direction: state.direction,
                mode: state.mode,
                panelExpand: state.panelExpand,
                layout: state.layout,
                specialty: state.specialty,
            }),
        },
    ),
)
