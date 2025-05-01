import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.primaryColor,
        fontFamily: theme.font,
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <h1>GoGetWell.ai</h1>
    </header>
  );
};

export default Header;
