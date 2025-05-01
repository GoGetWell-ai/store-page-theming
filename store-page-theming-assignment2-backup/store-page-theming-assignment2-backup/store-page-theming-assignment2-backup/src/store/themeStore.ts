/* Manages theme state and persistence */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeConfig } from '@/@types/theme';
import { themes } from '@/configs/theme.config';

type ThemeState = ThemeConfig & {
  specialty: 'default' | 'organ-transplant' | 'cosmetic-surgery';
};

type ThemeAction = {
  setSpecialty: (payload: ThemeState['specialty']) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set) => ({
      ...themes.default,
      specialty: 'default',
      setSpecialty: (payload) =>
        set(() => ({
          ...themes[payload],
          specialty: payload,
        })),
    }),
    {
      name: 'theme',
    },
  ),
);