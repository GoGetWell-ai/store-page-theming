import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import MenuBar from './components/shared/MenuBar'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'
import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    const { specialty, mode, setMode } = useThemeStore()  // Get mode from the store

    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark')
    }, [mode])  // Runs whenever 'mode' changes

    return (
        <div className={`theme-${specialty}`}>
            <Theme>
                <BrowserRouter>
                    <AuthProvider>
                        <Layout>
                            <MenuBar />
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </Theme>
        </div>
    )
}

export default App
