# Multi-Theme System Documentation

## Overview

The multi-theme system implemented in this SAAS frontend platform provides a flexible and user-friendly way to customize the visual appearance of the application based on different specialties. The system currently supports three distinct themes:

1. **Default Theme** - A clean, modern interface with blue accents
2. **Organ Transplant Theme** - A professional medical theme with green accents
3. **Cosmetic Surgery Theme** - An elegant, luxurious theme with pink accents

Each theme has been carefully designed to create a cohesive visual experience that aligns with the specific specialty it represents. The theming system affects all UI components including colors, typography, spacing, shadows, and border radiuses, ensuring a consistent look and feel throughout the application.

The themes are fully responsive and work seamlessly across all device sizes (desktop, tablet, and mobile), providing an optimal user experience regardless of the device being used.

## Implementation Details

### Zustand State Management

The theme system uses Zustand for state management, providing a lightweight and efficient way to handle theme selection and persistence. The implementation includes:

- A dedicated `themeStore.ts` that manages theme state
- Persistent storage using Zustand's `persist` middleware to remember user theme preferences
- Type-safe theme definitions with TypeScript

```typescript
// Key parts of themeStore.ts
type SpecialtyTheme = 'default' | 'organ-transplant' | 'cosmetic-surgery'

export const useThemeStore = create<ThemeStoreState & ThemeStoreActions>()(
    persist(
        (set) => ({
            ...inititialThemeState,
            specialty: 'default',

            // Theme setters
            setSpecialty: (payload: SpecialtyTheme) => set(() => ({ specialty: payload })),
            setMode: (payload: ThemeState['mode']) => set(() => ({ mode: payload })),
            // ... other setters
        }),
        {
            name: 'theme',
        },
    ),
)
```

### Tailwind CSS Integration

The theming system leverages Tailwind CSS for styling, using CSS variables to define theme properties that can be dynamically changed. This approach provides several benefits:

- **CSS Variables** - Theme colors and properties are defined as CSS variables in `themes.css`
- **Dynamic Class Binding** - Components use Tailwind classes that reference these CSS variables
- **Extended Configuration** - The Tailwind config extends the default theme with custom properties

```javascript
// tailwind.config.js excerpt
theme: {
  extend: {
    colors: {
      'primary': 'var(--primary)',
      'primary-deep': 'var(--primary-deep)',
      'primary-mild': 'var(--primary-mild)',
      'primary-subtle': 'var(--primary-subtle)',
      // ... other color variables
    },
    borderRadius: {
      'button': 'var(--button-radius)',
      'card': 'var(--card-radius)',
      'input': 'var(--input-radius)',
    },
    // ... other theme extensions
  }
}
```

### ThemeProvider and Theme Application

The theme system uses a combination of React components and CSS to apply themes:

1. **ThemeSelector Component** - Provides the UI for users to select themes and toggle dark mode
2. **CSS Data Attributes** - Themes are applied using the `data-theme` attribute on the HTML element
3. **Dark Mode Toggle** - Dark mode is implemented using Tailwind's dark mode class

```jsx
// ThemeSelector.tsx excerpt
useEffect(() => {
  // Remove any existing theme
  document.documentElement.removeAttribute('data-theme');
  
  // Only set the data-theme attribute for non-default themes
  if (specialty !== 'default') {
    document.documentElement.setAttribute('data-theme', specialty);
  }
  
  // Apply dark mode class if needed
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [specialty, mode]);
```

## Theme Customization Guide

### Adding a New Theme

To add a new theme to the system, follow these steps:

1. **Update Theme Types**:
   ```typescript
   // In themeStore.ts
   type SpecialtyTheme = 'default' | 'organ-transplant' | 'cosmetic-surgery' | 'your-new-theme'
   ```

2. **Add CSS Variables**:
   ```css
   /* In themes.css */
   [data-theme="your-new-theme"] {
     /* Color scheme */
     --background: #your-background-color;
     --card-bg: #your-card-background;
     --text: #your-text-color;
     --text-light: #your-light-text-color;
     --border: #your-border-color;
     --secondary: #your-secondary-color;
     
     --neutral: #ffffff;
     --primary: #your-primary-color;
     --primary-deep: #your-deep-primary;
     --primary-mild: #your-mild-primary;
     --primary-subtle: #your-subtle-primary;
     
     /* Status colors */
     --error: #your-error-color;
     --error-subtle: #your-subtle-error;
     --success: #your-success-color;
     --success-subtle: #your-subtle-success;
     --info: #your-info-color;
     --info-subtle: #your-subtle-info;
     --warning: #your-warning-color;
     --warning-subtle: #your-subtle-warning;
     
     /* Typography */
     --font-family: 'Your Font', sans-serif;
     --heading-font: 'Your Heading Font', serif;
     --body-font-size: 1rem;
     --heading-weight: 600;
     --body-weight: 400;
     --line-height: 1.6;
     
     /* UI Elements */
     --button-radius: 0.5rem;
     --card-radius: 0.75rem;
     --input-radius: 0.5rem;
     --shadow: your-shadow-value;
     --shadow-md: your-medium-shadow-value;
     
     /* Hero Section */
     --hero-bg: your-hero-background;
     --hero-text: #your-hero-text-color;
     --hero-height: 450px;
     
     /* Menu Bar */
     --menu-bg: #your-menu-background;
     --menu-text: #your-menu-text;
     --menu-hover: #your-menu-hover;
     --menu-active: #your-menu-active;
     --menu-active-text: #your-menu-active-text;
     --menu-border: #your-menu-border;
     --menu-shadow: your-menu-shadow-value;
   }
   
   /* Add dark mode overrides if needed */
   .dark[data-theme="your-new-theme"] {
     --primary: #your-dark-primary;
     --primary-deep: #your-dark-deep-primary;
     --primary-mild: #your-dark-mild-primary;
     --primary-subtle: rgba(r, g, b, 0.2);
     --menu-active: #your-dark-menu-active;
     --hero-bg: your-dark-hero-background;
   }
   ```

3. **Update ThemeSelector Component**:
   ```jsx
   // In ThemeSelector.tsx
   const themes = [
     // ... existing themes
     { 
       id: 'your-new-theme', 
       label: 'Your New Theme',
       description: 'Description of your new theme',
       primaryColor: 'var(--primary)',
       fontFamily: 'Your Font'
     },
   ];
   ```

4. **Import Required Fonts**:
   If your theme uses custom fonts, make sure to import them in your CSS:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');
   ```

### Example Color Structure

When creating a new theme, follow this color structure for consistency:

```
Theme Colors:
- Primary: Main brand color
- Primary Deep: Darker version for hover states
- Primary Mild: Lighter version for active states
- Primary Subtle: Very light version for backgrounds

Status Colors:
- Error/Success/Info/Warning: For status indicators
- Subtle variants: For backgrounds of status indicators

UI Colors:
- Background: Main page background
- Card Background: For card components
- Text: Primary text color
- Text Light: Secondary text color
- Border: For borders and dividers
```

## Screenshots

### Default Theme

#### Desktop
![Default Theme](/public/img/screenshots/default-1.png)
![Default Theme](/public/img/screenshots/default-2.png)
![Default Theme](/public/img/screenshots/default-3.png)
![Default Theme - Dark Mode](/public/img/screenshots/default-dark-1.png)

#### Tablet
![Default Theme - Tablet](/public/img/screenshots/default-tab-1.png)
![Default Theme - Tablet](/public/img/screenshots/default-tab-2.png)

#### Mobile
![Default Theme - Mobile](/public/img/screenshots/default-mobile-1.png)
![Default Theme - Mobile](/public/img/screenshots/default-mobile-2.png)

### Organ Transplant Theme

#### Desktop
![Organ Transplant Theme](/public/img/screenshots/cosmetic-1.png)
![Organ Transplant Theme](/public/img/screenshots/cosmetic-2.png)
![Organ Transplant Theme](/public/img/screenshots/cosmetic-3.png)
![Organ Transplant Theme](/public/img/screenshots/cosmetic-4.png)
![Organ Transplant Theme - Dark Mode](/public/img/screenshots/cosmetic-dark-1.png)
![Organ Transplant Theme - Dark Mode](/public/img/screenshots/cosmetic-dark-2.png)

#### Mobile
![Organ Transplant Theme - Mobile](/public/img/screenshots/cosmetic-mobile-1.png)
![Organ Transplant Theme - Mobile](/public/img/screenshots/cosmetic-mobile-2.png)
![Organ Transplant Theme - Mobile Dark](/public/img/screenshots/cosmetic-mobile--dark-1.png)

### Cosmetic Surgery Theme

#### Desktop
![Cosmetic Surgery Theme](/public/img/screenshots/organ-1.png)
![Cosmetic Surgery Theme](/public/img/screenshots/organ-2.png)
![Cosmetic Surgery Theme](/public/img/screenshots/organ-3.png)
![Cosmetic Surgery Theme - Dark Mode](/public/img/screenshots/organ-dark-1.png)
![Cosmetic Surgery Theme - Dark Mode](/public/img/screenshots/organ-dark-2.png)
![Cosmetic Surgery Theme - Dark Mode](/public/img/screenshots/organ-dark-3.png)

#### Tablet
![Cosmetic Surgery Theme - Tablet](/public/img/screenshots/organ-tab-1.png)
![Cosmetic Surgery Theme - Tablet](/public/img/screenshots/organ-tab-2.png)
![Cosmetic Surgery Theme - Tablet Dark](/public/img/screenshots/organ-tab-dark.png)

#### Mobile
![Cosmetic Surgery Theme - Mobile](/public/img/screenshots/organ-mobile-1.png)
![Cosmetic Surgery Theme - Mobile](/public/img/screenshots/organ-mobile-2.png)
![Cosmetic Surgery Theme - Mobile Dark](/public/img/screenshots/organ-mobile-dark-1.png)
![Cosmetic Surgery Theme - Mobile Dark](/public/img/screenshots/organ-mobile-dark-2.png)
## How to Test Themes

To test and preview the different themes in the application:

1. **Access the Theme Selector**:
   - Navigate to any page in the application
   - Click on the theme selector icon in the top navigation bar or settings panel

2. **Switch Between Themes**:
   - Select one of the available themes (Default, Organ Transplant, or Cosmetic Surgery)
   - The theme will be applied immediately without page refresh

3. **Toggle Dark Mode**:
   - Use the dark mode toggle in the theme selector
   - Each theme has specific dark mode overrides for optimal visibility

4. **Test Responsiveness**:
   - Use browser developer tools to test different screen sizes
   - Verify that all components adapt correctly to each viewport size

5. **Verify Component Styling**:
   - Check that all UI components (buttons, cards, inputs, etc.) reflect the selected theme
   - Ensure text readability and contrast meet accessibility standards

Your theme preference will be saved automatically and persisted between sessions, thanks to the Zustand store configuration with the persist middleware.