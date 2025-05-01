import React, { createContext, useState, ReactNode } from 'react';
import { themes } from './themes';

type Theme = typeof themes[keyof typeof themes];

interface ThemeContextType {
  theme: Theme;
  switchTheme: (name: keyof typeof themes) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.cardiology,
  switchTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themes.cardiology);

  const switchTheme = (name: keyof typeof themes) => {
    setTheme(themes[name]);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
