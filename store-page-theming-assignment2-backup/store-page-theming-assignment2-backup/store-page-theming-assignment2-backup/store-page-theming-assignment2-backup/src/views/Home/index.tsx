/* Themes page component */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const ThemesPage: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore();

  const themes = [
    { id: 'default', name: 'Default Medical', description: 'Professional theme for general medical services.' },
    { id: 'organ-transplant', name: 'Organ Transplant', description: 'Theme for organ transplant services.' },
    { id: 'cosmetic-surgery', name: 'Cosmetic Surgery', description: 'Theme for cosmetic procedures.' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ padding: `var(--layout-padding)` }}>
      <h1 className="text-h1 font-bold mb-8">Choose Your Theme</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {themes.map((theme) => (
          <div key={theme.id} className="card border shadow-sm flex flex-col items-center">
            <h2 className="text-h2 font-bold mb-2">{theme.name}</h2>
            <p className="text-body mb-4 text-center">{theme.description}</p>
            <button
              onClick={() => setSpecialty(theme.id as any)}
              className={`px-6 py-3 rounded-md ${specialty === theme.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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