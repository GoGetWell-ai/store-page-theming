import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import ThemeProvider from '@/components/template/ThemeProvider'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'

// Import the theme store to ensure theme state is available globally
import { useThemeStore } from '@/store/themeStore'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    // Initialize any theme state if needed
    const specialty = useThemeStore((state) => state.specialty)

    return (
        <Theme>
            <ThemeProvider>
                <BrowserRouter>
                    <AuthProvider>
                        {/* Layout component already includes MenuBar via PostLoginLayout */}
                        <Layout>
                            {/* Views component handles routing to Home and Themes pages */}
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Theme>
    )
}

export default App
