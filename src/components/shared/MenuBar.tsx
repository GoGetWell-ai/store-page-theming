import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ThemeSelector from '@/components/shared/ThemeSelector'

/**
 * MenuBar Component
 * 
 * This component provides a navigation menu bar with links to different pages
 * and integrates the ThemeSelector for easy theme switching.
 */
const MenuBar = () => {
  const location = useLocation()
  const specialty = useThemeStore((state) => state.specialty)

  // Define navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/themes', label: 'Themes' }
  ]

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Get theme-specific styling
  const getThemeColors = () => {
    switch (specialty) {
      case 'organTransplant':
        return {
          nav: 'bg-teal-700',
          activeLink: 'bg-teal-800',
          hoverLink: 'hover:bg-teal-600'
        }
      case 'cosmeticSurgery':
        return {
          nav: 'bg-pink-700',
          activeLink: 'bg-pink-800',
          hoverLink: 'hover:bg-pink-600'
        }
      default:
        return {
          nav: 'bg-primary',
          activeLink: 'bg-primary-deep',
          hoverLink: 'hover:bg-primary-mild'
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <nav className={`${themeColors.nav} text-white p-4 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive(item.path)
                  ? themeColors.activeLink
                  : themeColors.hoverLink
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar