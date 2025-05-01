/* Home page component */
import React from 'react';
import Hero from './components/Hero';
import GetInTouch from './components/GetInTouch';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ padding: `var(--layout-padding)`, background: `linear-gradient(135deg, var(--background), #f0f4f8)` }}>
      <Hero />
      <section className="py-16 px-4 text-center">
        <h2 className="text-h2 font-bold mb-8 text-gray-800">Our Specialized Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300" style={{ borderRadius: `var(--card-border-radius)` }}>
            <h3 className="text-lg font-semibold text-primary mb-4">Lung Transplant</h3>
            <p className="text-body text-gray-600">Expert care for life-saving lung transplant procedures.</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300" style={{ borderRadius: `var(--card-border-radius)` }}>
            <h3 className="text-lg font-semibold text-primary mb-4">Cosmetic Surgery</h3>
            <p className="text-body text-gray-600">Transformative solutions with precision and care.</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300" style={{ borderRadius: `var(--card-border-radius)` }}>
            <h3 className="text-lg font-semibold text-primary mb-4">Organ Care</h3>
            <p className="text-body text-gray-600">Comprehensive support for organ health and recovery.</p>
          </div>
        </div>
      </section>
      <GetInTouch />
    </div>
  );
};

export default Home;