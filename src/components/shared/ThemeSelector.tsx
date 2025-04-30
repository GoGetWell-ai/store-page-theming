import { Specialty, useThemeStore } from '@/store/themeStore'

export default function ThemeSelector() {
  const { specialty, setSpecialty } = useThemeStore()

  return (
    <select
      value={specialty}
      onChange={e => setSpecialty(e.target.value as Specialty)}
      className="bg-primary text-white p-1 rounded"
    >
      <option value="">Default</option>
      <option value="organ-transplant">Organ Transplant</option>
      <option value="cosmetic-surgery">Cosmetic Surgery</option>
    </select>
  )
}
