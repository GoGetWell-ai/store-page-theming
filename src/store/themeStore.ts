import create from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = {
    specialty: 'default' | 'theme1' | 'theme2';
    setSpecialty: (payload: ThemeState['specialty']) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            specialty: 'default',
            setSpecialty: (payload) => set(() => ({ specialty: payload })),
        }),
        {
            name: 'theme',
        }
    )
)
