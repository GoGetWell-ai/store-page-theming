// src/App.tsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from '@/components/template/ThemeProvider'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from '@/configs/app.config'

// Global styles
import '@/assets/styles/app.css'
import '@/assets/styles/themes.css'
import './locales'  // i18n initialization

if (appConfig.enableMock) {
  import('@/mock')
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Views />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
