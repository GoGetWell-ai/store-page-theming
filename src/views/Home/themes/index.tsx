import { specialtyThemes } from '@/configs/theme.config'
import { useThemeStore, Specialty } from '@/store/themeStore'

export default function ThemesPage() {
  const { specialty, setSpecialty } = useThemeStore()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select a Theme</h2>

      <div
        onClick={() => setSpecialty('')}
        className={`p-4 border rounded cursor-pointer ${
          !specialty ? 'border-primary-deep' : 'border-gray-300'
        }`}
      >
        Default
      </div>

      {Object.keys(specialtyThemes).map((key) => (
        <div
          key={key}
          onClick={() => setSpecialty(key as Specialty)}
          className={`p-4 border rounded cursor-pointer mt-2 ${
            specialty === key ? 'border-primary-deep' : 'border-gray-300'
          }`}
        >
          {key.replace('-', ' ')}
        </div>
      ))}
    </div>
  )
}
