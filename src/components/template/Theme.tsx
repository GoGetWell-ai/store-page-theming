import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import ThemeProvider from './ThemeProvider'

const Theme = (props: React.PropsWithChildren) => {
    const { children } = props
    const { mode, direction } = useThemeStore()

    useEffect(() => {
        document.documentElement.setAttribute('dir', direction)
        if (mode === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [mode, direction])

    return <ThemeProvider>{children}</ThemeProvider>
}

export default Theme