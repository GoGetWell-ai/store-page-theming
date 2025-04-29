import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSelector: React.FC = () => {
  const { switchTheme } = useContext(ThemeContext);

  return (
    <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>
      <button onClick={() => switchTheme('cardiology')}>Cardiology</button>
      <button onClick={() => switchTheme('dermatology')}>Dermatology</button>
      <button onClick={() => switchTheme('pediatrics')}>Pediatrics</button>
    </div>
  );
};

export default ThemeSelector;
