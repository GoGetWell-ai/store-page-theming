import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'

const MenuBar: React.FC = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(!open)

  return (
    <nav className={`bg-primary text-white`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand and Desktop Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/" className={`font-bold text-lg`}>
            🌐 Brand
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-primary-deep' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/themes"
              className={`px-3 py-2 rounded-md ${location.pathname === '/themes' ? 'bg-primary-deep' : ''}`}
            >
              Themes
            </Link>
          </div>

          {/* Desktop Theme Selector */}
          <div className="hidden md:flex">
            <ThemeSelector />
          </div>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="flex items-center space-x-3">
          <button
            className="md:hidden ml-2 text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/themes"
            className="block px-3 py-2 rounded-md"
            onClick={() => setOpen(false)}
          >
            Themes
          </Link>

          {/* Mobile Theme Selector */}
          <div className="pt-2">
            <ThemeSelector />
          </div>
        </div>
      )}
    </nav>
  )
}

export default MenuBar
