import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { themeConfig, specialtyThemes } from '@/configs/theme.config'
import type { Theme, LayoutType, Direction } from '@/@types/theme'

export type Specialty = '' | keyof typeof specialtyThemes

type ThemeState = Theme & {
  specialty: Specialty
}

type ThemeAction = {
  setSchema: (payload: string) => void
  setMode: (payload: ThemeState['mode']) => void
  setSideNavCollapse: (payload: boolean) => void
  setDirection: (payload: Direction) => void
  setPanelExpand: (payload: boolean) => void
  setLayout: (payload: LayoutType) => void
  setPreviousLayout: (payload: LayoutType | '') => void
  setSpecialty: (payload: Specialty) => void 
}
const initialThemeState: ThemeState = {
  ...themeConfig,
  specialty: '', 
}

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set) => ({
      ...initialThemeState,
      setSchema: (payload) => set(() => ({ themeSchema: payload })),
      setMode: (payload) => set(() => ({ mode: payload })),
      setSideNavCollapse: (payload) =>
        set((state) => ({ layout: { ...state.layout, sideNavCollapse: payload } })),
      setDirection: (payload) => set(() => ({ direction: payload })),
      setPanelExpand: (payload) => set(() => ({ panelExpand: payload })),
      setLayout: (payload) =>
        set((state) => ({ layout: { ...state.layout, type: payload } })),
      setPreviousLayout: (payload) =>
        set((state) => ({ layout: { ...state.layout, previousType: payload } })),
      setSpecialty: (payload) => set(() => ({ specialty: payload })),
    }),
    {
      name: 'theme',
    }
  )
)
