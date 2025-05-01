import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, LayoutType, Direction } from '@/@types/theme'

type ThemeState = Theme & {
  specialty: 'default' | 'theme1' | 'theme2'
  mode: 'light' | 'dark'
}

type ThemeAction = {
  setspecialty: (payload: ThemeState['specialty']) => void
  setSchema: (payload: string) => void
  setMode: (payload: ThemeState['mode']) => void
  setSideNavCollapse: (payload: boolean) => void
  setDirection: (payload: Direction) => void
  setPanelExpand: (payload: boolean) => void
  setLayout: (payload: LayoutType) => void
  setPreviousLayout: (payload: LayoutType | '') => void
}

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set, get) => ({
      ...themeConfig,
      specialty: 'default',
      mode: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',

      setspecialty: (payload) => set(() => ({ specialty: payload })),

      setSchema: (payload) => set(() => ({ themeSchema: payload })),

      setMode: (payload) => {
        localStorage.setItem('theme', payload)
        set(() => ({ mode: payload }))
      },

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
    }),
    {
      name: 'theme',
    }
  )
)
