import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';
import { themes } from '@/configs/theme.config';
import TopHospitals from '../components/TopHospitals';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';

// Helper function to calculate contrast text color
const getContrastTextColor = (bgColor: string): string => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const Themes: React.FC = () => {
  const { specialty, setSpecialty } = useThemeStore();
  const { hcfData } = useAuthStore();

  const handleThemeSelect = (themeId: string) => {
    setSpecialty(themeId as 'default' | 'theme1' | 'theme2');
  };

  const currentTheme = themes[specialty] || themes.default;
  const textColor = getContrastTextColor(currentTheme.colors.background);

  return (
    <div
      className="container mx-auto p-6"
      style={{
        fontFamily: currentTheme.typography.fontFamily,
        backgroundColor: currentTheme.colors.background,
        color: textColor,
      }}
    >
      <h1
        className="mb-6"
        style={{
          fontSize: currentTheme.typography.fontSize.h1,
          fontWeight: currentTheme.typography.fontWeight.bold,
          color: textColor,
        }}
      >
        Select a Theme
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(themes).map(([themeId, themeConfig]) => {
          const isSelected = themeId === specialty;
          return (
            <button
              key={themeId}
              onClick={() => handleThemeSelect(themeId)}
              role="option"
              aria-selected={isSelected}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                isSelected ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
              }`}
              style={{
                borderRadius: currentTheme.button.borderRadius,
                padding: currentTheme.button.padding,
                borderColor: isSelected ? currentTheme.colors.primary : undefined,
                color: textColor,
              }}
            >
              <h2
                className="text-xl font-semibold"
                style={{
                  fontSize: currentTheme.typography.fontSize.h2,
                  fontWeight: currentTheme.typography.fontWeight.bold,
                  color: textColor,
                }}
              >
                {themeConfig.marketingCopy.heroTitle}
              </h2>
              <p
                className="text-gray-600"
                style={{
                  fontSize: currentTheme.typography.fontSize.body,
                  fontWeight: currentTheme.typography.fontWeight.regular,
                  color: textColor,
                }}
              >
                {themeConfig.marketingCopy.heroSubtitle}
              </p>
              {isSelected && (
                <span
                  className="ml-2"
                  style={{ color: currentTheme.colors.accent }}
                >
                  (Selected)
                </span>
              )}
            </button>
          );
        })}
      </div>
      <Link
        to="/"
        className="mt-6 inline-block px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        style={{
          backgroundColor: currentTheme.colors.secondary,
          color: textColor,
          borderRadius: currentTheme.button.borderRadius,
          padding: currentTheme.button.padding,
        }}
      >
        Back to Home
      </Link>
      <div className="mt-8">
        <TopHospitals hcfData={hcfData} />
      </div>
    </div>
  );
};

export default Themes;