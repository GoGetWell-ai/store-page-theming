# GoGetWell.ai Theme System Implementation Assignment#2

## 🌈 Theme System Documentation
[Full documentation here →](./THEME.md)


## Project Overview

You'll be implementing a comprehensive multi-theme system for our platform that adapts the entire interface based on different medical specialties. This goes beyond simple color changes - each theme should provide a distinct and cohesive user experience tailored to different medical contexts.

The primary objective of this assignment is to evaluate your ability to perform complex frontend tasks.

## Requirements

### Features to Implement

1. **Menu Bar Navigation**
   - Create a navigation menu bar with two options:
     - Home (already implemented)
     - Themes (to be created)

2. **Themes Page**
   - Create a new "Themes" page at `src/views/Home/themes/`
   - This page should display all available themes
   - Allow users to preview and select different themes

3. **Multiple Theme Implementation**
   - Implement 3 themes in total:
     - Default theme (already exists)
     - 2 new themes focusing on different medical specialties (e.g., Organ Transplant, Cosmetic Surgery)

4. **Theme Configuration**
   - Use Zustand for state management
   - Configure Zustand to persist theme selection in localStorage
   - Apply the selected theme globally throughout the application

5. **Theme Components**
   - Each theme should include:
     - Color scheme variations
     - Typography changes
     - UI element styling (buttons, cards, forms)
     - Custom hero sections
     - Custom menu bar styling
    
**Important Notes:**
   
Each theme must implement comprehensive changes across:
- **Layout Structure:** Different component arrangements and spacing for each theme
- **Marketing Copy:** Theme-specific text content and messaging tailored to each specialty
- **Color Schemes:** Complete color palettes appropriate for each medical context
- **Typography:** Font families, sizes, weights, and line heights that reflect each specialty
- **UI Elements:** Custom-styled buttons, cards, forms, inputs, and interactive elements
- **Component Variations:** Specialty-specific designs for hero sections, testimonials, and CTAs

6. **Theme Color Configuration**
   - Implement Tailwind configuration for theme colors
   - Allow dynamic color switching between themes

## Technical Setup

### Prerequisites

- Docker
- Node.js (v14+)
- npm (v6+)

### Project Setup

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up Docker with Caddy for subdomain handling
   - Create a `Caddyfile` in the project root with the following content:
   ```
   {
     acme_ca https://acme-v02.api.letsencrypt.org/directory
   }

   # Wildcard subdomain handling
   *.localhost {
     # Add headers to identify the subdomain
     header {
       +X-Subdomain {labels.1}
     }
     reverse_proxy host.docker.internal:5173
   }

   # Handle base domain
   localhost {
     reverse_proxy host.docker.internal:5173
   }
   ```

4. Create a `docker-compose.yml` file with:
   ```yaml
   version: '3.8'
   services:
     caddy:
       image: caddy:2.7-alpine
       restart: unless-stopped
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./Caddyfile:/etc/caddy/Caddyfile:ro
         - caddy_data:/data
         - caddy_config:/config
       extra_hosts:
         - "host.docker.internal:host-gateway" # This is important for Docker to resolve host machine
   volumes:
     caddy_data:
     caddy_config:
   ```

5. Start the Docker Caddy server:
   ```bash
   docker-compose up -d
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Access the application via subdomains:
   - https://demo.localhost
   - https://demo5.localhost
   - https://seostore.localhost

## Implementation Guidelines

### Directory Structure

```
src/
├── @types/
│   └── theme.ts              # Add specialty theme types
├── assets/
│   └── styles/
│       ├── app.css           # Main CSS file
│       └── themes.css        # Theme CSS variables
├── components/
│   ├── shared/
│   │   └── ThemeSelector.tsx # Theme switching component
│   └── template/
│       └── ThemeProvider.tsx # Theme provider component
├── configs/
│   └── theme.config.ts       # Update theme configuration
├── store/
│   └── themeStore.ts         # Extend Zustand theme store
└── views/
    └── Home/
        ├── components/       # Update existing components
        │   ├── GetInTouch.tsx
        │   ├── Home.tsx
        │   └── ...
        ├── themes/           # Create theme specific components
        │   ├── base/         # Default theme
        │   │   ├── colors.ts
        │   │   └── typography.ts
        │   ├── theme1/       # First new theme
        │   │   ├── colors.ts
        │   │   └── typography.ts
        │   └── theme2/       # Second new theme
        │       ├── colors.ts
        │       └── typography.ts
        └── index.tsx
```

### Zustand Store Implementation

Extend the existing theme store in `src/store/themeStore.ts` to include specialty themes:

```typescript
// Example extension for themeStore.ts
type ThemeState = Theme & {
  specialty: 'default' | 'theme1' | 'theme2';
}

type ThemeAction = {
  // ... existing actions
  setSpecialty: (payload: ThemeState['specialty']) => void;
}

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set) => ({
      // ... existing state
      specialty: 'default',
      setSpecialty: (payload) => set(() => ({ specialty: payload })),
    }),
    {
      name: 'theme',
    },
  ),
)
```

### Theme Provider Implementation

Create a ThemeProvider component to apply theme CSS variables:

```typescript
import React, { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { specialty } = useThemeStore()
  
  useEffect(() => {
    // Apply CSS class based on selected theme
    document.documentElement.className = `theme-${specialty}`
  }, [specialty])
  
  return <>{children}</>
}

export default ThemeProvider
```

### Tailwind Configuration

Update the Tailwind configuration to use CSS variables for theme colors:

```javascript
// tailwind.config.cjs
module.exports = {
  // ...existing config
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-deep': 'var(--primary-deep)',
        'primary-mild': 'var(--primary-mild)',
        // ...additional theme colors
      },
    },
  },
}
```

### Menu Bar Implementation

Create a navigation menu component:

```tsx
// src/components/shared/MenuBar.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ThemeSelector from './ThemeSelector'

const MenuBar: React.FC = () => {
  const location = useLocation()
  const { specialty } = useThemeStore()
  
  return (
    <nav className={`bg-primary text-white p-4 ${specialty === 'theme1' ? 'theme1-nav' : specialty === 'theme2' ? 'theme2-nav' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-primary-deep' : ''}`}>
            Home
          </Link>
          <Link to="/themes" className={`px-3 py-2 rounded-md ${location.pathname === '/themes' ? 'bg-primary-deep' : ''}`}>
            Themes
          </Link>
        </div>
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar
```

## Testing and Deployment

1. **Local Testing**
   - Test all themes on different screen sizes
   - Verify theme persistence on page refresh
   - Check subdomain access via Caddy

2. **Code Standards**
   - Follow existing project code standards
   - Use proper TypeScript types
   - Use functional components with hooks
   - Follow the established design system patterns
   - Maintain proper component composition

## Submission Requirements

1. Complete code implementation
2. Documentation of theme system including:
   - Implementation details
   - Theme customization guide
   - Screenshots of different themes
3. Pull request with your changes following the project's contribution guidelines

## Resources

- Current theme implementation in `src/store/themeStore.ts`
- Existing styling in `src/assets/styles/app.css`
- Tailwind configuration in `tailwind.config.cjs`
- Component structure in `src/views/Home/components/`

## Key Features

- **Responsive Layout**: Optimized for all screen sizes and devices.
- **Dark/Light Mode**: Easily switch between light and dark themes.
- **Configurable Themes**: Personalize colors, layouts, and more to fit your needs.
- **Built with React + TypeScript**: Ensures robust type-checking and fast development.
- **Multi-Locale Support**: Easily add and manage multiple languages.
- **RTL Support**: Full Right-to-Left support for languages like Arabic or Hebrew.
- **Tailwind Component-Based Architecture**: Reusable components to streamline your development process.
- **API Ready**: Simple integration with any RESTful API.

## Guide

Please visit our [Online documentation](https://ecme-react.themenate.net/guide/documentation/introduction) for detailed guides, setup instructions, and customization options.

Good luck with your assignment!
