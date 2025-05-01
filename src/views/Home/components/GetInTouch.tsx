/* Get in Touch section component */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const GetInTouch: React.FC = () => {
  const { specialty } = useThemeStore();

  const content = {
    default: {
      title: 'Connect with a Trusted Partner',
      description: 'Reach out to our expert team for your healthcare needs.',
      button: 'Contact Us',
    },
    'organ-transplant': {
      title: 'Consult Our Transplant Specialists',
      description: 'Trusted care for your organ transplant journey.',
      button: 'Book Now',
    },
    'cosmetic-surgery': {
      title: 'Schedule with Our Experts',
      description: 'Trusted solutions for your cosmetic transformation.',
      button: 'Get Started',
    },
  };

  const { title, description, button } = content[specialty] || content.default;

  return (
    <section className="py-16 px-4 text-center bg-gray-50" style={{ borderTop: `1px solid var(--primary-mild)` }}>
      <h2 className="text-h2 font-bold mb-6 text-gray-800">{title}</h2>
      <p className="text-body mb-8 text-gray-600 max-w-2xl mx-auto">{description}</p>
      <button className="bg-primary text-white px-8 py-3 rounded-lg shadow-md hover:bg-primary-deep transition duration-300" style={{ borderRadius: `var(--button-border-radius)` }}>
        {button}
      </button>
    </section>
  );
};

export default GetInTouch;