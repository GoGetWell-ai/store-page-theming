import { THEMES, setTheme, getTheme, toggleDarkMode } from '../utils/themeManager';

/**
 * Theme Switcher Component
 * 
 * A simple component that allows users to switch between different themes
 * and toggle dark mode.
 */
export default class ThemeSwitcher {
  constructor(containerId = 'theme-switcher') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      this.container.className = 'theme-switcher fixed top-4 right-4 z-50 bg-card-bg p-4 rounded-lg shadow-lg border border-border';
      document.body.appendChild(this.container);
    }
    
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    const currentTheme = getTheme();
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    this.container.innerHTML = `
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 text-text">Theme Switcher</h3>
        <div class="flex flex-col gap-2">
          ${Object.values(THEMES).map(theme => `
            <label class="inline-flex items-center cursor-pointer">
              <input type="radio" name="theme" value="${theme}" 
                ${theme === currentTheme ? 'checked' : ''} 
                class="form-radio text-primary">
              <span class="ml-2 text-text">${this.formatThemeName(theme)}</span>
            </label>
          `).join('')}
        </div>
      </div>
      
      <div class="border-t border-border pt-3">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" id="dark-mode-toggle" 
            ${isDarkMode ? 'checked' : ''} 
            class="form-checkbox text-primary">
          <span class="ml-2 text-text">Dark Mode</span>
        </label>
      </div>
      
      <div class="mt-4 grid grid-cols-2 gap-2">
        <div class="p-3 bg-primary rounded text-white text-center">Primary</div>
        <div class="p-3 bg-primary-subtle rounded text-primary text-center">Subtle</div>
        <div class="p-3 bg-success rounded text-white text-center">Success</div>
        <div class="p-3 bg-error rounded text-white text-center">Error</div>
      </div>
    `;
  }
  
  formatThemeName(theme) {
    return theme
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  attachEventListeners() {
    // Theme radio buttons
    const themeRadios = this.container.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          setTheme(e.target.value);
        }
      });
    });
    
    // Dark mode toggle
    const darkModeToggle = this.container.querySelector('#dark-mode-toggle');
    darkModeToggle.addEventListener('change', (e) => {
      toggleDarkMode(e.target.checked);
    });
  }
  
  // Method to update the UI when theme changes externally
  update() {
    this.render();
    this.attachEventListeners();
  }
}

// Initialize the theme switcher when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});