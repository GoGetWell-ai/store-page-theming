# Theme System Documentation

## Table of Contents

1. [Overview](#overview)
2. [Implementation Details](#implementation-details)
    - [State Management](#state-management)
    - [Theme Provider](#theme-provider)
    - [Theme Configuration](#theme-configuration)
    - [CSS Variables](#css-variables)
    - [Responsive Design](#responsive-design)
3. [Theme Customization Guide](#theme-customization-guide)
    - [Adding a New Theme](#adding-a-new-theme)
    - [Customizing Existing Themes](#customizing-existing-themes)
    - [Using Themes in Components](#using-themes-in-components)
4. [Theme Gallery](#theme-gallery)
    - [Default Theme](#default-theme)
    - [Organ Transplant Theme](#organ-transplant-theme)
    - [Cosmetic Surgery Theme](#cosmetic-surgery-theme)
5. [Architecture](#architecture)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Overview

The GoGetWell.ai theme system is a comprehensive solution for implementing multiple medical specialty-focused themes throughout the application. It allows for dynamic switching between themes, persistent theme preferences, and consistent styling across all components.

The theme system goes beyond simple color changes, providing a complete user experience tailored to different medical contexts, including:

-   Specialty-specific color schemes
-   Custom typography settings
-   Specialized UI components
-   Themed marketing copy and messaging
-   Responsive layouts optimized for each specialty

## Implementation Details

### State Management

The theme system uses Zustand for state management, providing a lightweight and efficient solution for storing and updating theme preferences.

#### Key Files:

-   `src/store/themeStore.ts`: Main theme store implementation
-   `src/@types/theme.ts`: TypeScript types for theme configuration

#### Theme Store Implementation:

```typescript
// src/store/themeStore.ts
import type {
    Direction,
    LayoutType,
    SpecialtyType,
    Theme,
} from '@/@types/theme'
import { themeConfig } from '@/configs/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = Theme

type ThemeAction = {
    setSchema: (payload: string) => void
    setMode: (payload: ThemeState['mode']) => void
    setSideNavCollapse: (payload: boolean) => void
    setDirection: (payload: Direction) => void
    setPanelExpand: (payload: boolean) => void
    setLayout: (payload: LayoutType) => void
    setPreviousLayout: (payload: LayoutType | '') => void
    setSpecialty: (payload: SpecialtyType) => void
}

const inititialThemeState = themeConfig

export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
            ...inititialThemeState,
            setSchema: (payload) => set(() => ({ themeSchema: payload })),
            setMode: (payload) => set(() => ({ mode: payload })),
            setSideNavCollapse: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, sideNavCollapse: payload },
                })),
            setDirection: (payload) => set(() => ({ direction: payload })),
            setPanelExpand: (payload) => set(() => ({ panelExpand: payload })),
            setLayout: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, type: payload },
                })),
            setPreviousLayout: (payload) =>
                set((state) => ({
                    layout: { ...state.layout, previousType: payload },
                })),
            setSpecialty: (payload) => set(() => ({ specialty: payload })),
        }),
        {
            name: 'theme', // Storage key for localStorage
        },
    ),
)
```

#### Theme Types:

```typescript
// src/@types/theme.ts
export type Direction = 'ltr' | 'rtl'
export type Mode = 'light' | 'dark'
export type ControlSize = 'lg' | 'md' | 'sm'
export type LayoutType =
    | 'blank'
    | 'collapsibleSide'
    | 'stackedSide'
    | 'topBarClassic'
    | 'framelessSide'
    | 'contentOverlay'

export type SpecialtyType = 'default' | 'organ-transplant' | 'cosmetic-surgery'

export type Theme = {
    themeSchema: string
    direction: Direction
    mode: Mode
    panelExpand: boolean
    specialty: SpecialtyType
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType | ''
    }
}
```

### Theme Provider

The ThemeProvider component is responsible for applying theme styles to the application based on the current theme state.

#### Key Files:

-   `src/components/template/ThemeProvider.tsx`: Main theme provider component
-   `src/utils/applyThemeStyles.ts`: Utility for applying theme styles

#### Theme Provider Implementation:

```typescript
// src/components/template/ThemeProvider.tsx
import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import type { CommonProps } from '@/@types/common'
import { applyThemeStyles } from '@/utils/applyThemeStyles'

const ThemeProvider: React.FC<CommonProps> = ({ children }) => {
    const { specialty, mode } = useThemeStore()

    useEffect(() => {
        // Apply CSS class based on selected theme
        document.documentElement.className = `theme-${specialty}`

        // Apply theme styles
        applyThemeStyles(specialty, mode)
    }, [specialty, mode])

    return <>{children}</>
}

export default ThemeProvider
```

#### Apply Theme Styles Utility:

```typescript
// src/utils/applyThemeStyles.ts
import { SpecialtyType, Mode } from '@/@types/theme'
import { themeVariables } from '@/configs/theme-variables.config'

export const applyThemeStyles = (
    specialty: SpecialtyType,
    mode: Mode,
): void => {
    if (themeVariables[specialty] && themeVariables[specialty][mode]) {
        const variables = themeVariables[specialty][mode]
        const root = document.documentElement

        // Apply color variables
        Object.keys(variables.colors).forEach((key) => {
            root.style.setProperty(`--${key}`, variables.colors[key])
        })

        // Apply typography variables
        Object.keys(variables.typography).forEach((key) => {
            root.style.setProperty(`--font-${key}`, variables.typography[key])
        })

        // Apply spacing variables
        Object.keys(variables.spacing).forEach((key) => {
            root.style.setProperty(`--spacing-${key}`, variables.spacing[key])
        })
    }
}
```

### Theme Configuration

Each theme is defined with its own set of configuration files that specify colors, typography, and other theme-specific settings.

#### Key Files:

-   `src/views/Home/themes/base/colors.ts`: Default theme colors
-   `src/views/Home/themes/base/typography.ts`: Default theme typography
-   `src/views/Home/themes/organ-transplant/colors.ts`: Organ transplant theme colors
-   `src/views/Home/themes/organ-transplant/typography.ts`: Organ transplant theme typography
-   `src/views/Home/themes/cosmetic-surgery/colors.ts`: Cosmetic surgery theme colors
-   `src/views/Home/themes/cosmetic-surgery/typography.ts`: Cosmetic surgery theme typography

#### Example Theme Configuration:

```typescript
// src/views/Home/themes/base/colors.ts
export const colors = {
    primary: '#2a85ff',
    'primary-deep': '#0069f6',
    'primary-mild': '#4996ff',
    'primary-subtle': '#2a85ff1a',
    secondary: '#5d5fef',
    'secondary-deep': '#4a4cbe',
    'secondary-mild': '#7e80f1',
    'secondary-subtle': '#5d5fef1a',
    accent: '#00c8ff',
    neutral: '#ffffff',
    background: '#f5f5f7',
    'text-primary': '#1a1d1f',
    'text-secondary': '#6f767e',
    'text-accent': '#2a85ff',
    'border-color': '#e6e8ec',
    'card-bg': '#ffffff',
    'button-bg': '#2a85ff',
    'button-text': '#ffffff',
    'input-bg': '#ffffff',
    'input-text': '#1a1d1f',
    'hero-bg': '#2a85ff',
    'hero-text': '#ffffff',
}

// src/views/Home/themes/base/typography.ts
export const typography = {
    family: 'Inter, sans-serif',
    headingFamily: 'Inter, sans-serif',
    baseSize: '16px',
    headingSize: '24px',
    headingWeight: '700',
    bodyWeight: '400',
    lineHeight: '1.5',
}
```

### CSS Variables

The theme system uses CSS variables to apply theme styles throughout the application. These variables are defined in the theme configuration and applied by the ThemeProvider.

#### Key Files:

-   `src/configs/theme-variables.config.ts`: Theme variables configuration
-   `tailwind.config.cjs`: Tailwind configuration for theme colors

#### Theme Variables Configuration:

```typescript
// src/configs/theme-variables.config.ts
import { SpecialtyType, Mode } from '@/@types/theme'

type ThemeColors = {
    primary: string
    'primary-deep': string
    'primary-mild': string
    'primary-subtle': string
    secondary: string
    'secondary-deep': string
    'secondary-mild': string
    'secondary-subtle': string
    accent: string
    neutral: string
    background: string
    'text-primary': string
    'text-secondary': string
    'text-accent': string
    'border-color': string
    'card-bg': string
    'button-bg': string
    'button-text': string
    'input-bg': string
    'input-text': string
    'hero-bg': string
    'hero-text': string
}

type ThemeTypography = {
    family: string
    'heading-family': string
    'base-size': string
    'heading-size': string
    'heading-weight': string
    'body-weight': string
    'line-height': string
}

type ThemeSpacing = {
    base: string
    small: string
    medium: string
    large: string
    'section-padding': string
    'card-padding': string
    'button-padding': string
    'input-padding': string
}

type ThemeVariables = {
    colors: ThemeColors
    typography: ThemeTypography
    spacing: ThemeSpacing
}

type ThemeConfig = {
    [key in SpecialtyType]: {
        [key in Mode]: ThemeVariables
    }
}

export const themeVariables: ThemeConfig = {
    default: {
        light: {
            colors: {
                // Default theme light mode colors
            },
            typography: {
                // Default theme light mode typography
            },
            spacing: {
                // Default theme light mode spacing
            },
        },
        dark: {
            colors: {
                // Default theme dark mode colors
            },
            typography: {
                // Default theme dark mode typography
            },
            spacing: {
                // Default theme dark mode spacing
            },
        },
    },
    'organ-transplant': {
        light: {
            colors: {
                // Organ transplant theme light mode colors
            },
            typography: {
                // Organ transplant theme light mode typography
            },
            spacing: {
                // Organ transplant theme light mode spacing
            },
        },
        dark: {
            colors: {
                // Organ transplant theme dark mode colors
            },
            typography: {
                // Organ transplant theme dark mode typography
            },
            spacing: {
                // Organ transplant theme dark mode spacing
            },
        },
    },
    'cosmetic-surgery': {
        light: {
            colors: {
                // Cosmetic surgery theme light mode colors
            },
            typography: {
                // Cosmetic surgery theme light mode typography
            },
            spacing: {
                // Cosmetic surgery theme light mode spacing
            },
        },
        dark: {
            colors: {
                // Cosmetic surgery theme dark mode colors
            },
            typography: {
                // Cosmetic surgery theme dark mode typography
            },
            spacing: {
                // Cosmetic surgery theme dark mode spacing
            },
        },
    },
}
```

#### Tailwind Configuration:

```javascript
// tailwind.config.cjs
module.exports = {
    // ...existing config
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-deep': 'var(--primary-deep)',
                'primary-mild': 'var(--primary-mild)',
                'primary-subtle': 'var(--primary-subtle)',
                secondary: 'var(--secondary)',
                'secondary-deep': 'var(--secondary-deep)',
                'secondary-mild': 'var(--secondary-mild)',
                'secondary-subtle': 'var(--secondary-subtle)',
                accent: 'var(--accent)',
                neutral: 'var(--neutral)',
                background: 'var(--background)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-accent': 'var(--text-accent)',
                'border-color': 'var(--border-color)',
                'card-bg': 'var(--card-bg)',
                'button-bg': 'var(--button-bg)',
                'button-text': 'var(--button-text)',
                'input-bg': 'var(--input-bg)',
                'input-text': 'var(--input-text)',
                'hero-bg': 'var(--hero-bg)',
                'hero-text': 'var(--hero-text)',
            },
            fontFamily: {
                sans: 'var(--font-family)',
                heading: 'var(--font-heading-family)',
            },
        },
    },
}
```

### Responsive Design

All themed components are designed to be fully responsive, ensuring a consistent user experience across all screen sizes.

#### Key Files:

-   `src/views/Home/themes/index.tsx`: Themes page with responsive layout
-   `src/components/shared/MenuBar.tsx`: Responsive menu bar component

#### Responsive Layout Example:

```tsx
// src/views/Home/themes/index.tsx (excerpt)
<div className="min-h-screen bg-background flex flex-col">
    <MenuBar />
    <div className="flex-grow w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-text-primary mb-4">
                Theme Gallery
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
                Choose from our specialized themes designed for different
                medical specialties. Each theme provides a unique experience
                tailored to specific healthcare contexts.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Theme cards */}
        </div>
    </div>
    <div className="mt-auto">
        <Footer pageContainerType="contained" className="w-full" />
    </div>
</div>
```

## Theme Customization Guide

### Adding a New Theme

To add a new theme to the system, follow these steps:

1. **Define Theme Type**:
   Add your new theme to the `SpecialtyType` in `src/@types/theme.ts`:

    ```typescript
    export type SpecialtyType =
        | 'default'
        | 'organ-transplant'
        | 'cosmetic-surgery'
        | 'your-new-theme'
    ```

2. **Create Theme Configuration Files**:
   Create a new directory in `src/views/Home/themes/` for your theme:

    ```
    src/views/Home/themes/your-new-theme/
    ├── colors.ts
    └── typography.ts
    ```

3. **Define Theme Colors**:
   In `colors.ts`, define your theme's color palette:

    ```typescript
    export const colors = {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
        accent: '#your-accent-color',
        background: '#your-background-color',
        'text-primary': '#your-text-color',
        // Add all required colors...
    }
    ```

4. **Define Theme Typography**:
   In `typography.ts`, define your theme's typography settings:

    ```typescript
    export const typography = {
        family: 'Your Font Family, sans-serif',
        headingFamily: 'Your Heading Font, serif',
        // Add other typography settings...
    }
    ```

5. **Add Theme to Theme Gallery**:
   Update the `themes` array in `src/views/Home/themes/index.tsx` to include your new theme:

    ```typescript
    const themes = [
        // Existing themes...
        {
            id: 'your-new-theme',
            name: 'Your New Theme',
            description: 'Description of your theme',
            specialty: 'your-new-theme' as SpecialtyType,
            colors: yourNewThemeColors,
            typography: yourNewThemeTypography,
            features: [
                'Feature 1',
                'Feature 2',
                // Add features...
            ],
            heroText: 'Your Hero Text',
            subText: 'Your Subtext',
        },
    ]
    ```

6. **Update Theme Variables Config**:
   Add your theme to the theme variables configuration in `src/configs/theme-variables.config.ts`:

    ```typescript
    export const themeVariables: ThemeConfig = {
        // Existing themes...
        'your-new-theme': {
            light: {
                colors: {
                    // Your theme light mode colors
                },
                typography: {
                    // Your theme light mode typography
                },
                spacing: {
                    // Your theme light mode spacing
                },
            },
            dark: {
                colors: {
                    // Your theme dark mode colors
                },
                typography: {
                    // Your theme dark mode typography
                },
                spacing: {
                    // Your theme dark mode spacing
                },
            },
        },
    }
    ```

### Customizing Existing Themes

To modify an existing theme:

1. **Locate Theme Files**:
   Find the theme's configuration files in `src/views/Home/themes/[theme-name]/`.

2. **Modify Colors**:
   Edit the `colors.ts` file to change the theme's color palette.

3. **Modify Typography**:
   Edit the `typography.ts` file to change the theme's typography settings.

4. **Update Theme Description**:
   If needed, update the theme's description and features in `src/views/Home/themes/index.tsx`.

### Using Themes in Components

To make your components theme-aware:

1. **Access Theme State**:
   Import and use the theme store in your component:

    ```typescript
    import { useThemeStore } from '@/store/themeStore'

    const YourComponent = () => {
      const { specialty } = useThemeStore()

      // Use specialty to conditionally render or style components
      return (
        <div className={`my-component ${specialty === 'your-theme' ? 'your-theme-specific-class' : ''}`}>
          {/* Component content */}
        </div>
      )
    }
    ```

2. **Use Theme CSS Variables**:
   Use the theme CSS variables in your component styles:

    ```css
    .my-component {
        background-color: var(--background);
        color: var(--text-primary);
        font-family: var(--font-family);
    }
    ```

3. **Conditional Rendering**:
   You can conditionally render different content based on the active theme:

    ```typescript
    {specialty === 'organ-transplant' ? (
      <OrganTransplantSpecificContent />
    ) : specialty === 'cosmetic-surgery' ? (
      <CosmeticSurgerySpecificContent />
    ) : (
      <DefaultContent />
    )}
    ```

4. **Theme-Specific Components**:
   For more complex theme-specific components, you can create separate component files for each theme:

    ```typescript
    import { useThemeStore } from '@/store/themeStore'
    import DefaultHero from './DefaultHero'
    import OrganTransplantHero from './OrganTransplantHero'
    import CosmeticSurgeryHero from './CosmeticSurgeryHero'

    const Hero = () => {
      const { specialty } = useThemeStore()

      switch (specialty) {
        case 'organ-transplant':
          return <OrganTransplantHero />
        case 'cosmetic-surgery':
          return <CosmeticSurgeryHero />
        default:
          return <DefaultHero />
      }
    }
    ```

## Theme Gallery

### Default Theme

![Default Theme](./screenshots/default-theme.png)

The default theme features a professional blue color scheme optimized for general medical services.

**Key Characteristics:**

-   **Color Scheme**: Professional blue palette with clean white backgrounds
-   **Typography**: Modern sans-serif fonts for clear readability
-   **UI Elements**: Standard, accessible components with blue accents
-   **Marketing Copy**: General medical messaging focused on comprehensive care

**Color Palette:**

-   Primary: `#2a85ff` (Blue)
-   Secondary: `#5d5fef` (Purple)
-   Accent: `#00c8ff` (Light Blue)
-   Background: `#f5f5f7` (Light Gray)
-   Text Primary: `#1a1d1f` (Dark Gray)

**Typography:**

-   Font Family: `Inter, sans-serif`
-   Heading Family: `Inter, sans-serif`

### Organ Transplant Theme

![Organ Transplant Theme](./screenshots/organ-transplant-theme.png)

The organ transplant theme uses a calming green palette with specialized UI for transplant patient journeys.

**Key Characteristics:**

-   **Color Scheme**: Calming green palette with soft, reassuring tones
-   **Typography**: Clear, legible fonts optimized for medical information
-   **UI Elements**: Specialized components for transplant information and timelines
-   **Marketing Copy**: Focused on new beginnings and life-changing care

**Color Palette:**

-   Primary: `#34c759` (Green)
-   Secondary: `#30b383` (Teal)
-   Accent: `#5ac8fa` (Light Blue)
-   Background: `#f8faf8` (Pale Green)
-   Text Primary: `#1c2826` (Dark Green-Gray)

**Typography:**

-   Font Family: `Roboto, sans-serif`
-   Heading Family: `Roboto, sans-serif`

### Cosmetic Surgery Theme

![Cosmetic Surgery Theme](./screenshots/cosmetic-surgery-theme.png)

The cosmetic surgery theme features an elegant design with sophisticated typography and visually appealing layouts.

**Key Characteristics:**

-   **Color Scheme**: Elegant pink and purple palette with sophisticated tones
-   **Typography**: Refined typography with serif headings for elegance
-   **UI Elements**: Visually appealing components with subtle animations
-   **Marketing Copy**: Focused on transformation and aesthetic excellence

**Color Palette:**

-   Primary: `#ff2d55` (Pink)
-   Secondary: `#af52de` (Purple)
-   Accent: `#ff9500` (Orange)
-   Background: `#faf8fa` (Pale Pink)
-   Text Primary: `#1a1a1a` (Almost Black)

**Typography:**

-   Font Family: `Lato, sans-serif`
-   Heading Family: `Playfair Display, serif`

> **Note:** The screenshots above are generated using the script in `scripts/generate-theme-screenshots.js`. You can run this script to generate updated screenshots of each theme.

## Architecture

The theme system follows a clear architecture that ensures separation of concerns and maintainability:

```
┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │
│   Theme Selector    │─────▶│    Theme Store      │
│   (User Interface)  │◀─────│    (Zustand)        │
│                     │      │                     │
└─────────────────────┘      └──────────┬──────────┘
                                        │
                                        ▼
┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │
│   Theme Provider    │◀─────│  Theme Variables    │
│   (React Component) │      │  (Configuration)    │
│                     │      │                     │
└──────────┬──────────┘      └─────────────────────┘
           │
           ▼
┌─────────────────────┐
│                     │
│   Themed Components │
│   (UI Elements)     │
│                     │
└─────────────────────┘
```

**Key Components:**

1. **Theme Selector**: User interface for selecting themes
2. **Theme Store**: Zustand store for managing theme state
3. **Theme Variables**: Configuration for theme colors, typography, and spacing
4. **Theme Provider**: React component that applies theme styles
5. **Themed Components**: UI components that use theme variables

This architecture ensures:

-   Clear separation of concerns
-   Easy theme customization
-   Consistent application of themes
-   Persistent user preferences
-   Responsive design across all themes
