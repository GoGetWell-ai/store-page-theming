// src/store/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = {
    specialty: 'default' | 'theme1' | 'theme2'
    setSpecialty: (theme: ThemeState['specialty']) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            specialty: 'default',
            setSpecialty: (theme) => set({ specialty: theme }),
        }),
        {
            name: 'theme', // name in localStorage
        }
    )
)
