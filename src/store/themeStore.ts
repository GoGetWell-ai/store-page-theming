import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, LayoutType, Direction } from '@/@types/theme'

// Add Specialty type
type Specialty = 'default' | 'theme1' | 'theme2'

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
  setSpecialty: (payload: Specialty) => void // NEW
}

const inititialThemeState: ThemeState = {
  ...themeConfig,
  specialty: 'default', // NEW default value
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
      setSpecialty: (payload) => set(() => ({ specialty: payload })), // NEW setter
    }),
    {
      name: 'theme',
    }
  )
)
