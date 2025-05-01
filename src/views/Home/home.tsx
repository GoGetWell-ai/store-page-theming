import React from 'react'
import Hero from './components/hero'
import ThemedCard from './components/ui/ThemedCard'
import ThemedForm from './components/ui/ThemedForm'
import Testimonial from './components/Testimonial'
import CTA from './components/CTA'

const Home: React.FC = () => {
  return (
    <div className="space-y-10 px-4 py-6">
      <Hero />
      <ThemedCard
        title="Our Specialty Services"
        description="Learn more about how we cater to different medical specialties."
      />
      <button className="bg-blue-500 text-white dark:bg-gray-800 dark:text-gray-200 p-2 rounded">
  Dark Mode Button
</button>
      <Hero />
      <CTA />
      <ThemedForm />
    </div>
  )
}

export default Home
