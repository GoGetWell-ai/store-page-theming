import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { specialty } = useThemeStore()

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-default', 'theme-theme1', 'theme-theme2');
    
    // Add the current theme class
    document.documentElement.classList.add(`theme-${specialty}`);
  }, [specialty])

  return <>{children}</>
}

export default ThemeProvider