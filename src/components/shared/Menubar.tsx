// src/components/shared/MenuBar.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ThemeSelector from './ThemeSelector'

const MenuBar: React.FC = () => {
  const location = useLocation()
  
  return (
    <nav className="bg-menu-bg border-b border-menu-border shadow-menu">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-button font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-menu-active text-menu-active-text' 
                : 'text-menu-text hover:text-text hover:bg-menu-hover'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/auth/login" 
            className={`px-3 py-2 rounded-button font-medium transition-colors ${
              location.pathname === '/auth/login' 
                ? 'bg-menu-active text-menu-active-text' 
                : 'text-menu-text hover:text-text hover:bg-menu-hover'
            }`}
          >
            Login
          </Link>
        </div>
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar