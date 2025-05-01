/* Dropdown to select themes */
import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const ThemeSelector: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore(); // Get theme state and setter

  // List of available themes
  const themes = [
    { id: 'default', name: 'Default Medical' },
    { id: 'organ-transplant', name: 'Organ Transplant' },
    { id: 'cosmetic-surgery', name: 'Cosmetic Surgery' },
  ];

  return (
    <select
      value={specialty}
      onChange={(e) => setSpecialty(e.target.value as any)} // Update theme
      className="bg-primary-deep text-white px-4 py-2 rounded-md"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;