import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const ThemeSelector: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore();

  const themes = [
    { id: 'default', name: 'Default' },
    { id: 'theme1', name: 'Organ Transplant' },
    { id: 'theme2', name: 'Cosmetic Surgery' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialty(e.target.value as 'default' | 'theme1' | 'theme2');
  };

  return (
    <select
      value={specialty}
      onChange={handleChange}
      className="p-2 border rounded bg-white text-gray-700"
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