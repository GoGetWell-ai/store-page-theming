import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import ThemeProvider from '@/components/template/ThemeProvider'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <ThemeProvider>
            <Theme>
                <BrowserRouter>
                    <AuthProvider>
                        <Layout>
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </Theme>
        </ThemeProvider>
    )
}

export default App
