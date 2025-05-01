/* Navigation bar component */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';
import ThemeSelector from './ThemeSelector';

const MenuBar: React.FC = () => {
  const location = useLocation();
  const { specialty } = useThemeStore();

  return (
    <nav className={`bg-primary text-white sticky top-0 z-10`} style={{ padding: `var(--layout-padding)` }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex" style={{ gap: `var(--spacing-medium)` }}>
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-primary-deep' : 'hover:bg-primary-mild'}`}
          >
            Home
          </Link>
          <Link 
            to="/themes" 
            className={`px-3 py-2 rounded-md ${location.pathname === '/themes' ? 'bg-primary-deep' : 'hover:bg-primary-mild'}`}
          >
            Themes
          </Link>
        </div>
        <ThemeSelector />
      </div>
    </nav>
  );
};

export default MenuBar;