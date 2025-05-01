import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';

const LandingPage: React.FC = () => {
  const { specialty } = useThemeStore();

  return (
    <div className="min-h-screen bg-background font-theme text-body font-body">
      {/* Menu Bar */}
      <div className="bg-menu-bg border-b border-menu-border shadow-menu sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-heading font-heading text-text">Medical Specialties</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-menu-active text-menu-active inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Doctors
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-deep">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-hero-bg text-hero-text h-hero flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-heading font-heading mb-4">
              {specialty === 'organ-transplant' && "Leading Organ Transplant Specialists"}
              {specialty === 'cosmetic-surgery' && "Transform Your Beauty with Expert Care"}
              {specialty === 'default' && "Advanced Medical Care for Your Health"}
            </h1>
            <p className="text-xl mb-8">
              {specialty === 'organ-transplant' && "Our team of expert surgeons provides life-saving transplant procedures with the highest success rates."}
              {specialty === 'cosmetic-surgery' && "Discover our range of cosmetic procedures designed to enhance your natural beauty with minimal recovery time."}
              {specialty === 'default' && "Experience the future of healthcare with our cutting-edge technology and compassionate medical professionals."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-primary rounded-button hover:bg-opacity-90 font-medium">
                Our Services
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-button hover:bg-white hover:bg-opacity-10 font-medium">
                Meet Our Doctors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-heading text-text mb-4">Our Medical Specialties</h2>
            <p className="text-text-light max-w-3xl mx-auto">
              We offer a wide range of specialized medical services to meet your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-card-bg rounded-card shadow-theme p-6 border border-border">
              <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-heading text-text mb-2">Cardiology</h3>
              <p className="text-text-light mb-4">
                Our cardiology department provides comprehensive care for heart conditions with the latest diagnostic tools.
              </p>
              <a href="#" className="text-primary hover:text-primary-deep font-medium">Learn more →</a>
            </div>

            {/* Card 2 */}
            <div className="bg-card-bg rounded-card shadow-theme p-6 border border-border">
              <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-heading text-text mb-2">Family Medicine</h3>
              <p className="text-text-light mb-4">
                Our family medicine practitioners provide personalized care for patients of all ages.
              </p>
              <a href="#" className="text-primary hover:text-primary-deep font-medium">Learn more →</a>
            </div>

            {/* Card 3 */}
            <div className="bg-card-bg rounded-card shadow-theme p-6 border border-border">
              <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-heading text-text mb-2">Neurology</h3>
              <p className="text-text-light mb-4">
                Our neurology specialists diagnose and treat disorders of the nervous system with precision.
              </p>
              <a href="#" className="text-primary hover:text-primary-deep font-medium">Learn more →</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card-bg rounded-card shadow-theme-md p-8 border border-border">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-heading font-heading text-text mb-4">Ready to experience our care?</h2>
                <p className="text-text-light mb-6 md:mb-0">
                  Schedule an appointment with one of our specialists today and take the first step towards better health.
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <button className="px-6 py-3 bg-primary text-white rounded-button hover:bg-primary-deep shadow-theme">
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-heading font-heading text-text mb-4">Medical Specialties</h3>
              <p className="text-text-light">
                Providing exceptional healthcare services with a focus on patient comfort and advanced treatment options.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-heading text-text mb-4">Services</h3>
              <ul className="space-y-2 text-text-light">
                <li><a href="#" className="hover:text-primary">Cardiology</a></li>
                <li><a href="#" className="hover:text-primary">Neurology</a></li>
                <li><a href="#" className="hover:text-primary">Orthopedics</a></li>
                <li><a href="#" className="hover:text-primary">Pediatrics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-heading font-heading text-text mb-4">Company</h3>
              <ul className="space-y-2 text-text-light">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Our Doctors</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-heading font-heading text-text mb-4">Contact Us</h3>
              <ul className="space-y-2 text-text-light">
                <li>123 Medical Center Drive</li>
                <li>New York, NY 10001</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@medicalspecialties.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-text-light">
            <p>&copy; {new Date().getFullYear()} Medical Specialties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;