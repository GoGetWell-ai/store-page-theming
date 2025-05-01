# Theme System Documentation

##  Implementation Details

This project implements a dynamic multi-theme system using React, Zustand (state management), and Tailwind CSS. The core logic resides in the `useThemeStore.ts` file located at `src/store/useThemeStore.ts`.

### Key Functionalities:
- Users can switch between themes using the `ThemeSelector` component.
- Theme data is stored and managed using Zustand.
- Selected theme is persisted using `localStorage`, so it remains on page reload.
- Components such as `HeroSection`, `Navbar`, and others adapt dynamically to the selected theme by reading values from the store.

##  Theme Customization Guide

Each theme defines the following properties:

- `primaryColor`
- `secondaryColor`
- `backgroundColor`
- `textColor`
- `buttonStyles`
- `image` (optional)

To add or customize a theme:

1. Navigate to: `src/views/Home/themes/Themes.tsx`
2. Add a new theme object:
   ```ts
   {
     name: "Sunset",
     primaryColor: "#ff6b6b",
     secondaryColor: "#feca57",
     backgroundColor: "#fffbea",
     textColor: "#222",
     buttonStyles: "bg-yellow-400 text-black",
     image: "/themes/sunset-hero.png"
   }
