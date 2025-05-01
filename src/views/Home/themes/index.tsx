/* Themes page to preview and select themes */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const ThemesPage: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore();

  // Theme preview data
  const themePreviews = [
    {
      id: 'default',
      name: 'Default Medical',
      description: 'Professional theme for general medical services.',
    },
    {
      id: 'organ-transplant',
      name: 'Organ Transplant',
      description: 'Theme for organ transplant services.',
    },
    {
      id: 'cosmetic-surgery',
      name: 'Cosmetic Surgery',
      description: 'Theme for cosmetic procedures.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8" style={{ fontSize: 'var(--font-size-h1)' }}>
        Choose Your Theme
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {themePreviews.map((theme) => (
          <div
            key={theme.id}
            className={`border rounded-lg p-6 ${specialty === theme.id ? 'border-primary' : 'border-gray-200'}`}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ fontSize: 'var(--font-size-h2)' }}>
              {theme.name}
            </h2>
            <p className="text-gray-600 mb-4" style={{ fontSize: 'var(--font-size-body)' }}>
              {theme.description}
            </p>
            <button
              onClick={() => setSpecialty(theme.id as any)}
              className={`w-full py-2 px-4 rounded-md ${specialty === theme.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {specialty === theme.id ? 'Selected' : 'Select Theme'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesPage;