/* Hero section component */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const Hero: React.FC = () => {
  const { specialty } = useThemeStore();

  // Hero content based on theme
  const heroContent = {
    default: {
      title: 'Your trusted healthcare partner.',
      button: 'Get Started',
    },
    'organ-transplant': {
      title: 'Life-saving organ transplants.',
      button: 'Learn More',
    },
    'cosmetic-surgery': {
      title: 'Transform your beauty.',
      button: 'Book a Consultation',
    },
  };

  const content = heroContent[specialty] || heroContent.default;

  return (
    <div className="text-center">
      <h1 className="text-h1 font-bold mb-4">{content.title}</h1>
      <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-deep">
        {content.button}
      </button>
    </div>
  );
};

export default Hero;