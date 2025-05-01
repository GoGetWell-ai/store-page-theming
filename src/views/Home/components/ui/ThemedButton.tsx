import React from 'react'
import { useThemeStore } from '@/store/themeStore'

type Props = {
  children: React.ReactNode
  onClick?: () => void
}

const ThemedButton: React.FC<Props> = ({ children, onClick }) => {
  const { specialty } = useThemeStore()

  const base = 'px-4 py-2 rounded font-semibold transition-all duration-300'

  const themeClasses = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    theme1: 'bg-green-600 hover:bg-green-700 text-white',
    theme2: 'bg-pink-500 hover:bg-pink-600 text-white',
  }

  return (
    <button className={`${base} ${themeClasses[specialty]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default ThemedButton