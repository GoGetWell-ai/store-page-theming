/* Hero section component */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const Hero: React.FC = () => {
  const { specialty } = useThemeStore();

  const content = {
    default: {
      title: 'Your Trusted Healthcare Partner',
      button: 'Discover Services',
    },
    'organ-transplant': {
      title: 'Leaders in Organ Transplant Care',
      button: 'Learn More',
    },
    'cosmetic-surgery': {
      title: 'Trusted Experts in Cosmetic Surgery',
      button: 'Explore Options',
    },
  };

  const { title, button } = content[specialty] || content.default;

  return (
    <section className="bg-primary text-white py-24 text-center" style={{ background: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23000000" fill-opacity="0.1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,106.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"%3E%3C/path%3E%3C/svg%3E'), var(--primary)` }}>
      <h1 className="text-h1 font-bold mb-6" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>{title}</h1>
      <button className="bg-primary-deep text-white px-8 py-3 rounded-lg shadow-md hover:bg-primary-mild transition duration-300" style={{ borderRadius: `var(--button-border-radius)` }}>
        {button}
      </button>
    </section>
  );
};

export default Hero;