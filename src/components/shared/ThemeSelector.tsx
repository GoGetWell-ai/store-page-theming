
import { useThemeStore } from '@/store/themeStore'

const ThemeSelector = () => {
  const { specialty, setSpecialty, mode, setMode } = useThemeStore()

  // Theme options with detailed information
  const specialtyThemes = [
    { 
      id: 'default', 
      label: 'Default',
      color: '#2a85ff'
    },
    { 
      id: 'organ-transplant', 
      label: 'Organ Transplant',
      color: '#16a34a'
    },
    { 
      id: 'cosmetic-surgery', 
      label: 'Cosmetic Surgery',
      color: '#db2777'
    }
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value as 'default' | 'organ-transplant' | 'cosmetic-surgery')}
          className="appearance-none bg-card-bg border border-border text-text rounded-button py-2 pl-3 pr-10 shadow-theme focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {specialtyThemes.map(theme => (
            <option key={theme.id} value={theme.id}>{theme.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-light">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      <button
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-full bg-card-bg border border-border text-text hover:bg-background shadow-theme"
        aria-label="Toggle dark mode"
      >
        {mode === 'dark' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        )}
      </button>
    </div>
  )
}

export default ThemeSelector
