# Medical Specialty Theme System

A comprehensive theming system for medical specialty interfaces, supporting Default Medical, Organ Transplant, and Cosmetic Surgery themes.

## Overview

This theme system provides a robust, fully-featured solution for medical applications requiring different visual experiences based on medical specialties. The system implements a seamless theme switching mechanism with persistent theme preferences.
<img src="![localhost_5173_ (1)](https://github.com/user-attachments/assets/8cd9b436-3873-4053-b40c-3ff1ead82423)" width={100} height={200}/> 

![localhost_5173_](https://github.com/user-attachments/assets/78653582-07aa-4e0e-8af1-9f361e776ee4)
![localhost_5173_ (4)](https://github.com/user-attachments/assets/7a6d7229-5e96-44ad-8cf9-ebb7badfe8e0)



## Features

-   **Three Medical Specialty Themes**:
    -   **Default Medical**: Professional blue-based theme for general healthcare
    -   **Organ Transplant**: Teal/green theme representing life and renewal
    -   **Cosmetic Surgery**: Elegant pink/rose theme for aesthetic medicine
-   **Comprehensive Theming System**:
    -   Color schemes specific to each medical specialty
    -   Typography systems tailored for different content needs
    -   Consistent spacing and border-radius scales
    -   Smooth theme transitions without page reload
-   **State Management**:
    -   Theme preferences stored in localStorage
    -   Integrated with Zustand for state management
    -   Persists user theme preferences between sessions
-   **Easy Integration**:
    -   CSS variable-based approach
    -   Compatible with Tailwind CSS
    -   Theme-specific component styling

## Implementation Details

### Architecture

The theme system follows a well-structured architecture:

1. **Type Definitions** (`src/@types/theme.ts`):

    - Defines theme interfaces and types
    - Includes `ThemeSpecialty`, `ThemeColors`, `ThemeTypography`, etc.

2. **Theme Store** (`src/store/themeStore.ts`):

    - Zustand-based state management
    - Handles theme switching and persistence
    - Stores current theme specialty and configuration

3. **Theme Configurations** (`src/configs/specialty-themes.config.ts`):

    - Contains theme definitions for each specialty
    - Defines colors, typography, spacing, and border-radius

4. **CSS Variables** (`src/assets/styles/themes.css`):

    - Root variables for default theme
    - Theme-specific class selectors for specialty themes
    - Comprehensive set of design tokens

5. **Theme Provider** (`src/components/template/ThemeProvider.tsx`):

    - Applies theme classes to document root
    - Dynamically updates theme on change
    - Handles class management for theme switching

6. **Theme Selector UI** (`src/components/shared/ThemeSelector.tsx`):
    - User interface for theme switching
    - Dropdown menu with theme options
    - Visual indicators for active theme

### Implementation Flow

1. ThemeSelector component provides UI for theme selection
2. User selection triggers the `setSpecialty` action in the theme store
3. Theme store updates state with new specialty and associated config
4. ThemeProvider detects the change and applies appropriate CSS classes
5. CSS variables change throughout the application without reload
6. Components using theme variables automatically update their appearance

## Theme Customization Guide

### Adding a New Theme

To add a new medical specialty theme:

1. **Update Type Definitions**:

```typescript
// src/@types/theme.ts
export type ThemeSpecialty =
    | 'default'
    | 'organTransplant'
    | 'cosmeticSurgery'
    | 'yourNewTheme'
```

2. **Create Theme Configuration**:

```typescript
// src/configs/specialty-themes.config.ts
export const yourNewTheme: ThemeConfig = {
    colors: {
        primary: '#YOUR_PRIMARY_COLOR',
        secondary: '#YOUR_SECONDARY_COLOR',
        accent: '#YOUR_ACCENT_COLOR',
        background: '#YOUR_BACKGROUND_COLOR',
        text: '#YOUR_TEXT_COLOR',
        success: '#YOUR_SUCCESS_COLOR',
        warning: '#YOUR_WARNING_COLOR',
        danger: '#YOUR_DANGER_COLOR',
        info: '#YOUR_INFO_COLOR',
        muted: '#YOUR_MUTED_COLOR',
    },
    typography: {
        fontFamily: 'YOUR_FONT_FAMILY',
        headings: {
            fontWeight: 'YOUR_HEADING_WEIGHT',
            lineHeight: 'YOUR_HEADING_LINE_HEIGHT',
        },
        body: {
            fontSize: 'YOUR_BODY_FONT_SIZE',
            lineHeight: 'YOUR_BODY_LINE_HEIGHT',
        },
    },
    spacing: {
        base: '1rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
    },
    borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
    },
}
```

3. **Update Theme Store**:

```typescript
// src/store/themeStore.ts
import { yourNewTheme } from '@/configs/specialty-themes.config'

// Update specialtyThemes map
const specialtyThemes: Record<ThemeSpecialty, ThemeConfig> = {
    default: defaultTheme,
    organTransplant: organTransplantTheme,
    cosmeticSurgery: cosmeticSurgeryTheme,
    yourNewTheme: yourNewTheme,
}
```

4. **Add CSS Variables**:

```css
/* src/assets/styles/themes.css */
.theme-yourNewTheme {
    /* Colors */
    --primary: #YOUR_PRIMARY_COLOR;
    --primary-deep: #YOUR_PRIMARY_DEEP;
    --primary-mild: #YOUR_PRIMARY_MILD;
    --primary-subtle: #YOUR_PRIMARY_SUBTLEa;
    --secondary: #YOUR_SECONDARY_COLOR;
    --accent: #YOUR_ACCENT_COLOR;
    --background: #YOUR_BACKGROUND_COLOR;
    --text: #YOUR_TEXT_COLOR;
    --success: #YOUR_SUCCESS_COLOR;
    --success-subtle: #YOUR_SUCCESS_SUBTLEa;
    --warning: #YOUR_WARNING_COLOR;
    --warning-subtle: #YOUR_WARNING_SUBTLEa;
    --danger: #YOUR_DANGER_COLOR;
    --error: #YOUR_ERROR_COLOR;
    --error-subtle: #YOUR_ERROR_SUBTLEa;
    --info: #YOUR_INFO_COLOR;
    --info-subtle: #YOUR_INFO_SUBTLEa;
    --muted: #YOUR_MUTED_COLOR;

    /* Gradients */
    --gradient-primary: linear-gradient(
        135deg,
        #YOUR_GRADIENT_COLOR1,
        #YOUR_GRADIENT_COLOR2
    );
}
```

5. **Update ThemeProvider**:

```tsx
// src/components/template/ThemeProvider.tsx
useEffect(() => {
    document.documentElement.classList.remove(
        'theme-organTransplant',
        'theme-cosmeticSurgery',
        'theme-yourNewTheme',
    )

    if (specialty !== 'default') {
        document.documentElement.classList.add(`theme-${specialty}`)
    }

    // Update meta theme color if needed
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
        if (specialty === 'yourNewTheme') {
            metaThemeColor.setAttribute('content', '#YOUR_PRIMARY_COLOR')
        }
        // Other cases...
    }
}, [specialty])
```

6. **Update Theme Selector**:

```tsx
// src/components/shared/ThemeSelector.tsx
const themeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Organ Transplant', value: 'organTransplant' },
    { label: 'Cosmetic Surgery', value: 'cosmeticSurgery' },
    { label: 'Your New Theme', value: 'yourNewTheme' },
]

// Update gradient styles function
const getThemeGradientStyles = () => {
    switch (specialty) {
        case 'yourNewTheme':
            return 'bg-gradient-to-r from-your-color-700 to-your-color-500 hover:shadow-lg hover:from-your-color-600 hover:to-your-color-400'
        // Other cases...
    }
}
```

### Customizing an Existing Theme

To customize an existing theme:

1. Locate the theme configuration in `src/configs/specialty-themes.config.ts`
2. Modify the color values, typography settings, or other properties
3. Update the corresponding CSS variables in `src/assets/styles/themes.css`
4. If needed, adjust component-specific theme styles in your components

Example of customizing the Organ Transplant theme:

```typescript
// src/configs/specialty-themes.config.ts
export const organTransplantTheme: ThemeConfig = {
    colors: {
        primary: '#00796B', // Changed from #006064
        secondary: '#B2DFDB', // Changed from #4dd0e1
        // Other color changes...
    },
    typography: {
        fontFamily: 'Source Serif Pro, Georgia, serif', // Changed font
        // Other typography changes...
    },
    // Other changes...
}
```

### Using Theme Variables in Components

Components can access theme variables through CSS or adapt based on the current theme specialty:

#### CSS Approach

```css
.my-component {
    background-color: var(--primary);
    color: var(--text);
    border: 1px solid var(--primary-mild);
    border-radius: var(--border-radius-md);
}
```

#### React Component Approach

```tsx
import { useThemeStore } from '@/store/themeStore'

const MyComponent = () => {
    const specialty = useThemeStore((state) => state.specialty)

    // Get theme-specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'bg-teal-50 text-teal-700 border-teal-200'
            case 'cosmeticSurgery':
                return 'bg-pink-50 text-pink-700 border-pink-200'
            default:
                return 'bg-blue-50 text-blue-700 border-blue-200'
        }
    }

    return (
        <div className={`p-4 rounded-lg ${getThemeClasses()}`}>
            Theme-adaptive component
        </div>
    )
}
```

## Best Practices

1. **Consistency**: Maintain consistent naming conventions across themes
2. **Accessibility**: Ensure sufficient color contrast for readability
3. **Gradual Testing**: Test theme changes across different components
4. **Semantic Variables**: Use semantic color names that reflect purpose rather than appearance
5. **Component Adaptation**: Design components to adapt gracefully between themes

## Resources

-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
-   [Zustand Documentation](https://github.com/pmndrs/zustand)
-   [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## License

This theme system is licensed under the MIT License. See the LICENSE file for details.
