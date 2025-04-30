import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, LayoutType, Direction } from '@/@types/theme'


type SpecialtyTheme = 'default' | 'organ-transplant' | 'cosmetic-surgery'

type ThemeState = Theme & {
    specialty: SpecialtyTheme
}
type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (payload: SpecialtyTheme) => void
}

const inititialThemeState = {
    ...themeConfig,
    specialty: 'default'
}

interface ThemeStoreState extends ThemeState {
    // No need to redefine specialty as it's already defined in ThemeState
}

interface ThemeStoreActions extends ThemeAction {
    // Override the setSpecialty action with the correct payload type
    setSpecialty: (payload: SpecialtyTheme) => void
}

export const useThemeStore = create<ThemeStoreState & ThemeStoreActions>()(
    persist(
        (set) => ({
            ...inititialThemeState,
            specialty: 'default',

            // setters
            setSchema: (payload: string) => set(() => ({ themeSchema: payload })),
            setMode: (payload: ThemeState['mode']) => set(() => ({ mode: payload })),
            setSideNavCollapse: (payload: boolean) =>
                set((state) => ({
                    layout: { ...state.layout, sideNavCollapse: payload },
                })),
            setSpecialty: (payload: SpecialtyTheme) => set(() => ({ specialty: payload })),
            setDirection: (payload: Direction) => set(() => ({ direction: payload })),
            setPanelExpand: (payload: boolean) => set(() => ({ panelExpand: payload })),
            setLayout: (payload: LayoutType) =>
                set((state) => ({
                    layout: { ...state.layout, type: payload },
                })),
            setPreviousLayout: (payload: LayoutType | '') =>
                set((state) => ({
                    layout: { ...state.layout, previousType: payload },
                })),
        }),
        {
            name: 'theme',
        },
    ),
)