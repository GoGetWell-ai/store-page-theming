import React from 'react'
import ThemeSelector from '@/components/shared/ThemeSelector'

const ThemePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Choose a Theme</h1>
      {/* ThemeSelector renders responsive theme cards */}
      <ThemeSelector />
    </div>
  )
}

export default ThemePage