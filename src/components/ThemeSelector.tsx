import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import DarkModeToggle from '@/components/shared/DarkModeToggle';

/**
 * ThemeSelector Component
 * 
 * A React component that allows users to switch between different themes
 * and toggle dark mode using Zustand for state management.
 */
const ThemeSelector: React.FC = () => {
  const { specialty, mode, setSpecialty, setMode } = useThemeStore();

  // Apply theme to HTML element whenever it changes
  useEffect(() => {
    // Remove any existing theme
    document.documentElement.removeAttribute('data-theme');
    
    // Only set the data-theme attribute for non-default themes
    if (specialty !== 'default') {
      document.documentElement.setAttribute('data-theme', specialty);
    }
    
    // Apply dark mode class if needed
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [specialty, mode]);

  // Theme options with detailed information
  const themes = [
    { 
      id: 'default', 
      label: 'Default Theme',
      description: 'Clean, modern interface with blue accents',
      primaryColor: 'var(--primary)',
      fontFamily: 'Inter'
    },
    { 
      id: 'organ-transplant', 
      label: 'Organ Transplant',
      description: 'Professional medical theme with green accents',
      primaryColor: 'var(--primary)',
      fontFamily: 'Roboto/Roboto Slab'
    },
    { 
      id: 'cosmetic-surgery', 
      label: 'Cosmetic Surgery',
      description: 'Elegant, luxurious theme with pink accents',
      primaryColor: 'var(--primary)',
      fontFamily: 'Playfair Display'
    }
  ];

  return (
    <div className="theme-selector bg-card-bg p-6 rounded-card shadow-theme-md border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-heading mb-4 text-text">Theme Selector</h3>
        
        <div className="space-y-4">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              className={`p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                specialty === theme.id 
                  ? 'border-primary bg-primary-subtle' 
                  : 'border-border hover:border-primary hover:bg-primary-subtle hover:bg-opacity-50'
              }`}
              onClick={() => setSpecialty(theme.id as any)}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={specialty === theme.id}
                  onChange={() => setSpecialty(theme.id as any)}
                  className="form-radio text-primary"
                />
                <span className={`ml-2 font-medium ${specialty === theme.id ? 'text-primary' : 'text-text'}`}>
                  {theme.label}
                </span>
              </div>
              
              <div className="ml-6">
                <p className="text-text-light text-sm mb-2">{theme.description}</p>
                <div className="flex items-center text-sm">
                  <span className="text-text-light mr-2">Font:</span>
                  <span className="text-text">{theme.fontFamily}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: theme.primaryColor }}></span>
                  <span className="text-text-light text-sm">Primary Color</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border pt-4 mb-4">
        <div className="flex items-center justify-between p-2 rounded-md">
          <span className="text-text dark:text-text-light">Dark Mode</span>
          <div className="flex items-center space-x-3">
            <label className="flex items-center cursor-pointer">
              <div className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full ${
                mode === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <input
                  type="checkbox"
                  className="opacity-0 absolute w-full h-full cursor-pointer z-10"
                  checked={mode === 'dark'}
                  onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
                />
                <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  mode === 'dark' ? 'transform translate-x-6' : ''
                }`}></span>
              </div>
            </label>
            <DarkModeToggle />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-light uppercase tracking-wider">Preview</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-primary rounded-button text-white text-center shadow-theme">Primary</div>
          <div className="p-3 bg-primary-subtle rounded-button text-primary text-center shadow-theme">Subtle</div>
        </div>
        <div className="p-3 bg-card-bg border border-border rounded-button shadow-theme">
          <div className="h-2 w-24 bg-primary rounded-full mb-2"></div>
          <div className="h-2 w-16 bg-text-light rounded-full opacity-30"></div>
        </div>
        <div className="flex space-x-1">
          <div className="h-8 w-8 rounded-full bg-success"></div>
          <div className="h-8 w-8 rounded-full bg-error"></div>
          <div className="h-8 w-8 rounded-full bg-warning"></div>
          <div className="h-8 w-8 rounded-full bg-info"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;