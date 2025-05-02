// src/store/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeKey = 'base' | 'cosmeticSurgery' | 'organTransplant'
type LayoutType = 'default' | 'dashboard' // Add your layout types here

interface ThemeState {
    specialty: ThemeKey
    layout: {
        current: LayoutType
        previous: LayoutType | null
    }
    setSpecialty: (theme: ThemeKey) => void
    setLayout: (layout: LayoutType) => void
    setPreviousLayout: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            specialty: 'base',
            layout: {
                current: 'default',
                previous: null
            },
            setSpecialty: (theme) => set({ specialty: theme }),
            setLayout: (layout) => set({
                layout: {
                    current: layout,
                    previous: get().layout.current
                }
            }),
            setPreviousLayout: () => set(state => ({
                layout: {
                    current: state.layout.previous || 'default',
                    previous: null
                }
            }))
        }),
        {
            name: 'theme',
            partialize: (state) => ({ specialty: state.specialty }) // Only persist theme
        }
    )
)