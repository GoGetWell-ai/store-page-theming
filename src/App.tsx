import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'
import ThemeProvider from './components/template/ThemeProvider'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <Theme>
					<ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
					</ThemeProvider>
        </Theme>
    )
}

export default App
