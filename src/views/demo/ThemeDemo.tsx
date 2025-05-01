import React from 'react';
import ThemeSelector from '@/components/ThemeSelector';

const ThemeDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-theme text-body font-body">
      {/* Menu Bar */}
      <div className="bg-menu-bg border-b border-menu-border shadow-menu sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-heading font-heading text-text">Theme Demo</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-menu-active text-menu-active inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#" className="border-transparent text-menu-text hover:text-text hover:border-menu-hover inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-deep">
                Sign Up
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
              Dynamic Theme Switching Demo
            </h1>
            <p className="text-xl mb-8">
              Experience seamless theme switching with CSS variables and Tailwind CSS.
              Choose between Default, Organ Transplant, and Cosmetic Surgery themes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-primary rounded-button hover:bg-opacity-90 font-medium">
                Learn More
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-button hover:bg-white hover:bg-opacity-10 font-medium">
                View Themes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Theme Selector */}
          <div className="lg:w-1/4 sticky top-24 self-start">
            <ThemeSelector />
          </div>
          
          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-card-bg rounded-card shadow-theme-md p-6 border border-border mb-8">
              <h1 className="text-3xl font-heading font-heading text-text mb-6">Theme Demonstration</h1>
              
              <section className="mb-8">
                <h2 className="text-2xl font-heading font-heading text-text mb-4">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary text-white rounded-card">Primary</div>
                  <div className="p-4 bg-primary-deep text-white rounded-card">Primary Deep</div>
                  <div className="p-4 bg-primary-mild text-white rounded-card">Primary Mild</div>
                  <div className="p-4 bg-primary-subtle text-primary rounded-card">Primary Subtle</div>
                  <div className="p-4 bg-secondary text-white rounded-card">Secondary</div>
                  <div className="p-4 bg-background text-text border border-border rounded-card">Background</div>
                  <div className="p-4 bg-card-bg text-text border border-border rounded-card">Card Background</div>
                  <div className="p-4 bg-white text-text border border-border rounded-card">Text: <span className="text-text">Primary Text</span></div>
                  <div className="p-4 bg-white text-text-light border border-border rounded-card">Text Light</div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-heading font-heading text-text mb-4">Typography</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-card-bg border border-border rounded-card">
                    <h1 className="text-4xl font-heading font-heading text-text mb-2">Heading 1</h1>
                    <p className="text-text-light">Font family: var(--heading-font), Weight: var(--heading-weight)</p>
                  </div>
                  <div className="p-4 bg-card-bg border border-border rounded-card">
                    <h2 className="text-3xl font-heading font-heading text-text mb-2">Heading 2</h2>
                    <p className="text-text-light">Font family: var(--heading-font), Weight: var(--heading-weight)</p>
                  </div>
                  <div className="p-4 bg-card-bg border border-border rounded-card">
                    <h3 className="text-2xl font-heading font-heading text-text mb-2">Heading 3</h3>
                    <p className="text-text-light">Font family: var(--heading-font), Weight: var(--heading-weight)</p>
                  </div>
                  <div className="p-4 bg-card-bg border border-border rounded-card">
                    <p className="text-text mb-2">Body Text</p>
                    <p className="text-text-light">Font family: var(--font-family), Size: var(--body-font-size), Weight: var(--body-weight), Line height: var(--line-height)</p>
                  </div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-heading font-heading text-text mb-4">Status Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-success text-white rounded-card">Success</div>
                  <div className="p-4 bg-success-subtle text-success rounded-card">Success Subtle</div>
                  <div className="p-4 bg-error text-white rounded-card">Error</div>
                  <div className="p-4 bg-error-subtle text-error rounded-card">Error Subtle</div>
                  <div className="p-4 bg-info text-white rounded-card">Info</div>
                  <div className="p-4 bg-info-subtle text-info rounded-card">Info Subtle</div>
                  <div className="p-4 bg-warning text-white rounded-card">Warning</div>
                  <div className="p-4 bg-warning-subtle text-warning rounded-card">Warning Subtle</div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-heading font-heading text-text mb-4">UI Components</h2>
                
                <div className="space-y-6">
                  <div className="p-4 border border-border rounded-card">
                    <h3 className="text-xl font-heading font-heading text-text mb-3">Buttons</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-deep shadow-theme">
                        Primary Button
                      </button>
                      <button className="px-4 py-2 bg-primary-subtle text-primary rounded-button hover:bg-primary-mild hover:text-white shadow-theme">
                        Secondary Button
                      </button>
                      <button className="px-4 py-2 border border-border text-text rounded-button hover:bg-background shadow-theme">
                        Outline Button
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-card">
                    <h3 className="text-xl font-heading font-heading text-text mb-3">Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-card-bg border border-border rounded-card shadow-theme">
                        <h4 className="text-lg font-heading font-heading text-text mb-2">Card Title</h4>
                        <p className="text-text-light">This is a sample card with default styling.</p>
                      </div>
                      <div className="p-4 bg-primary-subtle border border-primary rounded-card shadow-theme">
                        <h4 className="text-lg font-heading font-heading text-primary mb-2">Primary Card</h4>
                        <p className="text-text-light">This is a sample card with primary styling.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-card">
                    <h3 className="text-xl font-heading font-heading text-text mb-3">Forms</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-text font-medium mb-1">Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-text font-medium mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-text font-medium mb-1">Message</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows={4}
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-deep shadow-theme">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="p-4 border border-border rounded-card">
                    <h3 className="text-xl font-heading font-heading text-text mb-3">Alerts</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-success-subtle border-l-4 border-success rounded-card">
                        <p className="text-success font-medium">Success Alert</p>
                        <p className="text-text-light text-sm">This operation was completed successfully.</p>
                      </div>
                      <div className="p-3 bg-error-subtle border-l-4 border-error rounded-card">
                        <p className="text-error font-medium">Error Alert</p>
                        <p className="text-text-light text-sm">There was an error processing your request.</p>
                      </div>
                      <div className="p-3 bg-warning-subtle border-l-4 border-warning rounded-card">
                        <p className="text-warning font-medium">Warning Alert</p>
                        <p className="text-text-light text-sm">Please review the information before proceeding.</p>
                      </div>
                      <div className="p-3 bg-info-subtle border-l-4 border-info rounded-card">
                        <p className="text-info font-medium">Info Alert</p>
                        <p className="text-text-light text-sm">Here's some information you might find useful.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;