/* Get in Touch section component */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const GetInTouch: React.FC = () => {
  const { specialty } = useThemeStore();

  const content = {
    default: {
      title: 'Get in Touch',
      description: 'Contact us for your healthcare needs.',
      button: 'Contact Now',
    },
    'organ-transplant': {
      title: 'Schedule a Transplant Consultation',
      description: 'Reach out to our organ transplant specialists.',
      button: 'Book Now',
    },
    'cosmetic-surgery': {
      title: 'Book Your Cosmetic Consultation',
      description: 'Transform your beauty with our experts.',
      button: 'Schedule a Visit',
    },
  };

  const { title, description, button } = content[specialty] || content.default;

  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-h2 font-bold mb-4">{title}</h2>
      <p className="text-body mb-6">{description}</p>
      <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-deep">
        {button}
      </button>
    </section>
  );
};

export default GetInTouch;