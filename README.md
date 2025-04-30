### Implementation Details

Global Theme State
The current theme is managed globally using Zustand (useThemeStore). It stores and updates the selected theme (specialty), which reflects the user's selection.

Applying the Theme
The <body> or root element’s className is updated dynamically based on the selected theme:

document.body.className = `theme-${specialty}` // e.g., theme-default, theme-theme1
Each theme uses a corresponding CSS class to inject CSS variables via :root.

Tailwind Integration
In tailwind.config.js, Tailwind colors are mapped to CSS variables like so:

colors: {
  'primary': 'var(--primary)',
  'primary-deep': 'var(--primary-deep)',
  'gray-100': 'var(--gray-100)',
  ...
}

This allows you to use Tailwind classes like bg-primary, text-gray-100, etc., and have them respond to the current theme.

ThemeSelector Component
A responsive component provides buttons for each theme:

On desktop: It’s always visible in the navbar.

On mobile: It appears inside the hamburger menu dropdown.


### Theme Customization Guide
Themes are defined in your global.css (or imported CSS) using class-based variables:

css
Copy
Edit
.theme-default {
  --primary: #1d4ed8;
  --primary-deep: #1e40af;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
  ...
}

.theme-theme1 {
  --primary: #16a34a;
  --primary-deep: #15803d;
  ...
}

.theme-theme2 {
  --primary: #db2777;
  --primary-deep: #be185d;
  ...
}
To customize a theme, simply edit its values.

### Add a New Theme


Add a new class in your global CSS:


Edit
.theme-dark {
  --primary: #000000;
  --primary-deep: #1a1a1a;
  --gray-100: #222;
  --gray-900: #fff;
  ...
}


Add a new button in ThemeSelector.tsx:

<button
  onClick={() => handleThemeChange('dark')}
  className={`p-2 rounded-md ${specialty === 'dark' ? 'bg-primary-deep' : 'bg-gray-200'}`}
>
  Dark Mode
</button>