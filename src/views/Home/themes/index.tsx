import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import { MedicalSpecialty } from '@/@types/theme';

// Import theme configurations
import defaultColors from './base/colors';
import organTransplantColors from './theme1/colors';
import cosmeticSurgeryColors from './theme2/colors';

const ThemePage: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore();

  const themes = [
    { 
      id: 'default', 
      name: 'Default Theme', 
      description: 'A clean and professional theme suitable for general medical services.',
      colors: defaultColors,
      image: "/api/placeholder/400/200"
    },
    { 
      id: 'organTransplant', 
      name: 'Organ Transplant', 
      description: 'A specialized theme for organ transplant services with a focus on life-saving care.',
      colors: organTransplantColors,
      image: "/api/placeholder/400/200"
    },
    { 
      id: 'cosmeticSurgery', 
      name: 'Cosmetic Surgery', 
      description: 'An elegant theme designed for cosmetic surgery services with an emphasis on aesthetics.',
      colors: cosmeticSurgeryColors,
      image: "/api/placeholder/400/200"
    }
  ];

  const handleThemeChange = (themeId: string) => {
    setSpecialty(themeId as MedicalSpecialty);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Medical Specialty Themes</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose a theme that best represents your medical specialty. Each theme is designed 
          to create a unique and cohesive user experience tailored to different medical contexts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme) => (
          <div 
            key={theme.id}
            className={`rounded-lg overflow-hidden shadow-lg border-2 transition-all ${
              specialty === theme.id ? 'border-primary scale-105' : 'border-transparent'
            }`}
          >
            <div className="h-48 bg-gray-200">
              <img 
                src={theme.image} 
                alt={`${theme.name} preview`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{theme.name}</h3>
              <p className="text-gray-600 mb-6">{theme.description}</p>
              
              <div className="flex mb-6 gap-2">
                {Object.values(theme.colors).slice(0, 4).map((color, idx) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <button
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full py-2 px-4 rounded ${
                  specialty === theme.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {specialty === theme.id ? 'Current Theme' : 'Apply Theme'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePage;