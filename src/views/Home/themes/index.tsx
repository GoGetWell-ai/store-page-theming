// src/views/Home/themes/index.tsx
import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import type { Meta } from '@/@types/routes'

const themes = [
  {
    id: 'default',
    name: 'Default Theme',
    previewColor: '#007bff',
    previewText: 'Modern healthcare interface',
    typography: 'font-sans text-base',
    buttonStyle: 'bg-blue-600 text-white',
    cardStyle: 'bg-white text-black shadow',
  },
  {
    id: 'theme1',
    name: 'Cosmetic Surgery Theme',
    previewColor: '#4caf50',
    previewText: 'Elegant and soft visuals',
    typography: 'font-serif text-lg italic',
    buttonStyle: 'bg-pink-500 text-white',
    cardStyle: 'bg-pink-100 text-pink-900 shadow-md',
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    previewColor: '#000',
    previewText: 'Night mode design',
    typography: 'font-mono text-sm',
    buttonStyle: 'bg-gray-800 text-white',
    cardStyle: 'bg-gray-900 text-white shadow-lg',
  },
]

const ThemesPage = (props: Meta ): JSX.Element => {
  const { specialty, setSpecialty } = useThemeStore()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Select a Theme</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`rounded-lg p-4 border cursor-pointer transition-transform hover:scale-105 ${
              specialty === theme.id ? 'ring-4 ring-primary' : ''
            }`}
            onClick={() => setSpecialty(theme.id as any)}
            style={{ backgroundColor: theme.previewColor }}
          >
            <h2 className="text-white text-lg font-semibold mb-2">{theme.name}</h2>
            <p className="text-white text-sm mb-3">{theme.previewText}</p>

            {/* Typography Preview */}
            <div className={`p-2 rounded mb-2 bg-white ${theme.typography}`}>
              Typography Preview
            </div>

            {/* Button Preview */}
            <button className={`px-3 py-2 rounded ${theme.buttonStyle}`}>
              Sample Button
            </button>

            {/* Card Preview */}
            <div className={`mt-3 p-3 rounded ${theme.cardStyle}`}>
              This is a sample card.
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThemesPage
