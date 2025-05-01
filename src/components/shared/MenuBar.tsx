// src/components/shared/MenuBar.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ThemeSelector from './ThemeSelector'

const MenuBar: React.FC = () => {
  const location = useLocation()
  const { specialty } = useThemeStore()
  
  return (
    <nav className={`bg-primary text-white p-4 ${specialty === 'theme1' ? 'theme1-nav' : specialty === 'theme2' ? 'theme2-nav' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-start min-h-screen">
        <div className="flex space-x-4">
          <Link to="/" className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-primary-deep' : ''}`}>
            Home
          </Link>
          <Link to="/themes" className={`px-3 py-2 rounded-md ${location.pathname === '/themes' ? 'bg-primary-deep' : ''}`}>
            Themes
          </Link>
        </div>
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar