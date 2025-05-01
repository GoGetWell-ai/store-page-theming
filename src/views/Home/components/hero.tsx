import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import ThemeToggle from './ThemeToggle'

const Hero: React.FC = () => {
  const { specialty } = useThemeStore()

  return (
    <div className="text-center py-20 px-4">
      <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-black-600">
  <div className="text-xl font-semibold text-black-800 dark:text-black"></div>
  <ThemeToggle />
</div>
      {specialty === 'default' && (
        <>
          <h1 className="text-4xl font-bold">Welcome to Our Healthcare Platform</h1>
          <p className="mt-4 text-lg text-gray-600">Trusted care for everyone.</p>
        </>
      )}
      {specialty === 'theme1' && (
        <>
          <h1 className="text-4xl font-bold text-green-700">Organ Transplant Center</h1>
          <p className="mt-4 text-lg text-green-500">Advanced solutions for complex transplants.</p>
        </>
      )}
      {specialty === 'theme2' && (
        <>
          <h1 className="text-4xl font-bold text-pink-700">Cosmetic Surgery Experts</h1>
          <p className="mt-4 text-lg text-pink-500">Enhance your beauty with precision care.</p>
        </>
      )}
    </div>
  )
}

export default Hero
