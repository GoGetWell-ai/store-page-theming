
import { useThemeStore } from '@/store/themeStore'

const ThemeSelector = () => {
  const { specialty, setSpecialty } = useThemeStore()

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
    <div className="flex items-center">
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
    </div>
  )
}

export default ThemeSelector
