Theme System Guide
Overview
explaining  how the theme system is implemented in the project, how it can be customized, and includes reference screenshots of each theme. The system supports dynamic switching between multiple UI themes (Default, Green, and Dark), with the selected theme persisting across page reloads.

## Implementation Details
1. Theme State Management
The theme is managed globally using Zustand `src/store/themeStore.ts`.
```typescript

type ThemeState = Theme & {
    specialty: 'default' | 'theme1' | 'dark' // Add your new themes here
}

// Just the allowed values for specialty theme switching
type ThemeType = ThemeState['specialty']


type ThemeAction = {
   // existing actions
    setSpecialty: (payload: ThemeType) => void // Action to change the active theme
}


export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set) => ({
     
            ...inititialThemeState,

       
        //existing code
            setSpecialty: (theme: ThemeType) => set({ specialty: theme }),
        }),
        {
            name: 'theme', // localStorage key name
        }
    )
)
```

The state includes specialty (which holds the current theme), and setSpecialty to update it.


2. Theme Variables with CSS Custom Properties
The file `src/assets/themes.css` defines variables like:


```css

/*  Default Theme (applies when no specific theme is selected) */
:root {
  --color-primary: #007bff;
  /* Blue (default) */
  --text-heading:#000;
}

/*Theme 1 – Green Color Theme */
.theme1 {
  --color-primary: #4caf50;
  /* Green */
  --text-heading:#000;
}

/*  Dark Theme – Black */
.dark {
  --color-primary: #000000;
  /* Black */
  --text-heading:#ccc;
}


/* Global heading styles */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-heading) !important;
}
```

Each theme (:root, .theme1, .dark) overrides these variables.

3. Global Class Switching
A useEffect in the layout component applies the current theme class (default, theme1, dark) to the document.body.
```tsx
import React, { useEffect } from 'react'


import { useThemeStore } from '@/store/themeStore'

// This component wraps your whole app and applies the current theme class to <body>
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
 
    const { specialty } = useThemeStore()

    // Whenever the theme (`specialty`) changes, this effect runs
    useEffect(() => {
  
        document.body.classList.remove('default', 'theme1',  'dark')

 
        // This allows you to target different themes via Tailwind like: `body.theme1 .bg-primary { ... }`
        document.body.classList.add(specialty)
    }, [specialty]) // This effect re-runs only if `specialty` value changes


    return <>{children}</>
}

export default ThemeProvider
```

This enables the CSS variables to take effect based on the active theme.

4. Component Integration
ThemeSelector.tsx: Dropdown to select and switch themes.
```tsx

import React from 'react'

type ThemeType = 'default' | 'theme1' | 'dark'


import { useThemeStore } from '@/store/themeStore'

const ThemeSelector: React.FC = () => {

  const { specialty, setSpecialty } = useThemeStore()


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSpecialty(e.target.value as ThemeType)
  }

  return (
    <select
      value={specialty} 
      onChange={handleChange}
      className="bg-primary-mild text-black px-3 py-2 rounded-md" /
    >
      {/*  These are the options the user can pick from */}
      <option value="default">Default</option>
      <option value="theme1">Green Theme</option>
      <option value="dark">Dark Theme</option>
    </select>
  )
}

export default ThemeSelector
```

MenuBar.tsx: Reactively styled based on the active theme.
```tsx 


import React from 'react'
import { Link, useLocation } from 'react-router-dom' 
import { useThemeStore } from '@/store/themeStore' 
import ThemeSelector from './ThemeSelector' 



const MenuBar: React.FC = () => {
  const location = useLocation() 
  const { specialty } = useThemeStore() 

  return (
    <nav
      className={`
        bg-primary text-white p-4 
        ${specialty === 'theme1' ? 'theme1-nav' : ''} 
        ${specialty === 'dark' ? 'theme2-nav' : ''}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 🔗 Page navigation links */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`
              px-3 py-2 rounded-md 
              ${location.pathname === '/' ? 'bg-primary-deep' : ''}
            `}
          >
            Home
          </Link>
          <Link
            to="/themes"
            className={`
              px-3 py-2 rounded-md 
              ${location.pathname === '/themes' ? 'bg-primary-deep' : ''}
            `}
          >
            Themes
          </Link>
        </div>

        {/* 🎛 Theme Selector dropdown/button */}
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar

```

All components automatically adapt by using CSS variables and Tailwind classes like bg-primary, which map to the correct variable values.
```cjs

/** @type {import('tailwindcss').Config} */

module.exports = {

	theme: {
	
		extend: {
			//  Here we override Tailwind's color palette with CSS variables
			// These variables will change based on the theme class on <body>
			colors: {
				'primary': 'var(--color-primary)',
			},
		},
	},


}

```

5. Heading Visibility Fix
A global rule was added:`src/assets/styles/themes.css`


h1, h2, h3, h4, h5, h6 {
  color: var(--text-heading);
}

This ensures consistent and visible headings across all themes.

## How to Customize or Add New Themes
1.Add a new CSS block in themes.css:


.new-theme-name {
  --color-primary: #yourColor;
  --text-heading: #yourTextColor;
}


2.Update Zustand store options to include the new theme key (specialty).

3.Add the theme in the <select> inside ThemeSelector.tsx.

4.(Optional) Create new preview UI for the theme inside `src/views/Home/themes/index.tsx`.

5.That's it! The theme will now work globally thanks to the CSS class and Zustand-based reactivity.

### ✅ Default Theme
![Default Theme](./assets/screenshots/default-theme.png)

### 💅 Green Theme
![Green Theme](./assets/screenshots/green-theme.png)

### 🌙 Dark Theme
![Dark Theme](./assets/screenshots/dark-theme.png)

## Submission Checklist
 Full code in place using Zustand for state management

 Theme system implemented with CSS variables and Tailwind integration

 ThemeSelector component added for switching themes dynamically

 Preview page/component created to showcase available themes

 Theme styles applied consistently across routes and pages

 Responsive and accessible UI maintained in all themes

 Pull request submitted following the project’s contribution guidelines

