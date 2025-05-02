// src/store/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SpecialtyTheme = 'default' | 'theme1' | 'theme2';

interface ThemeState {
    specialty: SpecialtyTheme;
    setSpecialty: (payload: SpecialtyTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            specialty: 'default', // Default theme
            setSpecialty: (payload) => set({ specialty: payload }),
        }),
        {
            name: 'theme', // stored in localStorage as 'theme'
        }
    )
);
