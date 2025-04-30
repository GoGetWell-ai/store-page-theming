import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ThemeSelector from './ThemeSelector'
import { useState } from 'react'

const MenuBar = () => {
  const location = useLocation()
  const { specialty, mode } = useThemeStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">StoreTheme</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') 
                    ? 'border-primarySubtle text-white'
                    : 'border-transparent text-primarySubtle hover:border-primaryMild hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/themes"
                className={`${
                  isActive('/themes')
                    ? 'border-primarySubtle text-white'
                    : 'border-transparent text-primarySubtle hover:border-primaryMild hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Themes
              </Link>
              <Link
                to="/products"
                className={`${
                  isActive('/products')
                    ? 'border-primarySubtle text-white'
                    : 'border-transparent text-primarySubtle hover:border-primaryMild hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Products
              </Link>
            </div>
          </div>
          
          {/* Theme selector and mobile menu button */}
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <ThemeSelector />
            </div>
            
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-primarySubtle hover:text-white hover:bg-primaryDeep focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-primaryDeep`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              isActive('/') 
                ? 'bg-primaryMild text-white'
                : 'text-primarySubtle hover:bg-primary hover:text-white'
            } block pl-3 pr-4 py-2 border-l-4 ${isActive('/') ? 'border-white' : 'border-transparent'} text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/themes"
            className={`${
              isActive('/themes') 
                ? 'bg-primaryMild text-white'
                : 'text-primarySubtle hover:bg-primary hover:text-white'
            } block pl-3 pr-4 py-2 border-l-4 ${isActive('/themes') ? 'border-white' : 'border-transparent'} text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Themes
          </Link>
          <Link
            to="/products"
            className={`${
              isActive('/products') 
                ? 'bg-primaryMild text-white'
                : 'text-primarySubtle hover:bg-primary hover:text-white'
            } block pl-3 pr-4 py-2 border-l-4 ${isActive('/products') ? 'border-white' : 'border-transparent'} text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <div className="px-4 pt-2 pb-3">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MenuBar