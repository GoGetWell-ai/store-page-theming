
import { themeConfig } from '@/configs/theme.config'

import { create } from 'zustand'


import { persist } from 'zustand/middleware'

import type { Theme, LayoutType, Direction } from '@/@types/theme'

type ThemeState = Theme & {
    specialty: 'default' | 'theme1' | 'dark' // Add your new themes here
}

// Just the allowed values for specialty theme switching
type ThemeType = ThemeState['specialty']


type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (payload: ThemeType) => void // Action to change the active theme
}

// ---- Initial Theme State ----
const inititialThemeState: ThemeState = {
    ...themeConfig,          // Default settings from config file
    specialty: 'default',    // Default theme (can be 'default' | 'theme1' | 'dark')
}


export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
     
            ...inititialThemeState,

       
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

          
            setSpecialty: (theme: ThemeType) => set({ specialty: theme }),
        }),
        {
            name: 'theme', // localStorage key name
        }
    )
)
