import React from 'react'
import ThemedButton from './ThemedButton'

const ThemedForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded"
      />
      <ThemedButton>Submit</ThemedButton>
    </form>
  )
}

export default ThemedForm