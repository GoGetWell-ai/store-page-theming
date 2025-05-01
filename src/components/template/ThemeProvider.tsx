/* Wraps app to apply theme styles */
import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty } = useThemeStore(); // Get current theme

  // Apply theme class to HTML root
  useEffect(() => {
    document.documentElement.className = `theme-${specialty}`;
  }, [specialty]);

  return <>{children}</>;
};

export default ThemeProvider;