import React from 'react'
import { useThemeStore } from '@/store/themeStore'

type Props = {
  title: string
  description: string
}

const ThemedCard: React.FC<Props> = ({ title, description }) => {
  const { specialty } = useThemeStore()

  const themeBorders = {
    default: 'border-blue-400',
    theme1: 'border-green-500',
    theme2: 'border-pink-400',
  }

  return (
    <div className={`border p-4 rounded shadow-md ${themeBorders[specialty]}`}>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default ThemedCard