/**
 * Theme Manager Utility
 * 
 * Provides functions to manage theme switching in the application.
 * Supports default, organ-transplant, and cosmetic-surgery themes.
 */

// Available themes
export const THEMES = {
  DEFAULT: 'default',
  ORGAN_TRANSPLANT: 'organ-transplant',
  COSMETIC_SURGERY: 'cosmetic-surgery'
};

/**
 * Set the active theme
 * @param {string} theme - The theme to set (use values from THEMES object)
 */
export const setTheme = (theme) => {
  // Remove any existing theme
  document.documentElement.removeAttribute('data-theme');
  
  // Only set the data-theme attribute for non-default themes
  if (theme !== THEMES.DEFAULT) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  // Save the theme preference to localStorage
  localStorage.setItem('theme', theme);
};

/**
 * Get the current active theme
 * @returns {string} The current theme
 */
export const getTheme = () => {
  return document.documentElement.getAttribute('data-theme') || THEMES.DEFAULT;
};

/**
 * Initialize theme from saved preference or default
 */
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    setTheme(savedTheme);
  } else {
    setTheme(THEMES.DEFAULT);
  }
};

/**
 * Toggle dark mode
 * @param {boolean} isDark - Whether to enable dark mode
 */
export const toggleDarkMode = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
};

/**
 * Initialize dark mode from saved preference
 */
export const initDarkMode = () => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    toggleDarkMode(true);
  } else if (savedDarkMode === 'false') {
    toggleDarkMode(false);
  } else {
    // If no preference is saved, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    toggleDarkMode(prefersDark);
  }
};

// Example theme switcher component
export const createThemeSwitcher = (container) => {
  if (!container) return;
  
  // Create theme options
  const themes = [
    { id: THEMES.DEFAULT, label: 'Default Theme' },
    { id: THEMES.ORGAN_TRANSPLANT, label: 'Organ Transplant' },
    { id: THEMES.COSMETIC_SURGERY, label: 'Cosmetic Surgery' }
  ];
  
  // Create the select element
  const select = document.createElement('select');
  select.className = 'theme-selector';
  
  // Add options
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.id;
    option.textContent = theme.label;
    select.appendChild(option);
  });
  
  // Set initial value
  select.value = getTheme();
  
  // Add event listener
  select.addEventListener('change', (e) => {
    setTheme(e.target.value);
  });
  
  // Add dark mode toggle
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'dark-mode-toggle';
  checkbox.checked = document.documentElement.classList.contains('dark');
  
  const label = document.createElement('label');
  label.htmlFor = 'dark-mode-toggle';
  label.textContent = 'Dark Mode';
  
  darkModeToggle.appendChild(checkbox);
  darkModeToggle.appendChild(label);
  
  checkbox.addEventListener('change', (e) => {
    toggleDarkMode(e.target.checked);
  });
  
  // Append to container
  container.appendChild(select);
  container.appendChild(darkModeToggle);
  
  return { select, darkModeToggle };
};