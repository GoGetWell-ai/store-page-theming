import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { themes } from '@/configs/theme.config';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty } = useThemeStore();

  useEffect(() => {
    const theme = themes[specialty];
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--text', theme.colors.text);
    root.style.setProperty('--accent', theme.colors.accent);

    // Apply typography
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--font-size-h1', theme.typography.fontSize.h1);
    root.style.setProperty('--font-size-h2', theme.typography.fontSize.h2);
    root.style.setProperty('--font-size-body', theme.typography.fontSize.body);
    root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold.toString());
    root.style.setProperty('--font-weight-regular', theme.typography.fontWeight.regular.toString());

    // Apply button styles
    root.style.setProperty('--button-border-radius', theme.button.borderRadius);
    root.style.setProperty('--button-padding', theme.button.padding);

    // Add a class to the root for theme-specific styling
    root.classList.remove('theme-default', 'theme-theme1', 'theme-theme2');
    root.classList.add(`theme-${specialty}`);
  }, [specialty]);

  return <>{children}</>;
};

export default ThemeProvider;