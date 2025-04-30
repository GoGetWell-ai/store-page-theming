import { useEffect } from 'react'
import ConfigProvider from '@/components/ui/ConfigProvider'
import { themeConfig } from '@/configs/theme.config'
import useDarkMode from '@/utils/hooks/useDarkMode'
import useTheme from '@/utils/hooks/useTheme'
import useLocale from '@/utils/hooks/useLocale'
import useDirection from '@/utils/hooks/useDirection'
import type { CommonProps } from '@/@types/common'
import { useThemeStore } from '@/store/themeStore'

const Theme = (props: CommonProps) => {
    useTheme()
    useDarkMode()
    useDirection()

    const { locale } = useLocale()
    const specialty = useThemeStore((state) => state.specialty)
    const mode = useThemeStore((state) => state.mode)
    
    // Apply specialty theme
    useEffect(() => {
        // Remove any existing theme
        document.documentElement.removeAttribute('data-theme');
        
        // Only set the data-theme attribute for non-default themes
        if (specialty !== 'default') {
            document.documentElement.setAttribute('data-theme', specialty);
        }
        
        // Apply dark mode class if needed
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [specialty, mode]);
    
    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
