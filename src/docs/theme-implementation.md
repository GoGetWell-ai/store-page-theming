# Medical Website Theme Implementation Documentation

## Step 1: Define Theme Types

In this step, we extended the theme types to support multiple medical specialty themes:

- Added `ThemeSpecialty` type with options: 'default', 'organTransplant', and 'cosmeticSurgery'
- Created new type definitions for theme components:
  - `ThemeColors`: Defines color palette for each theme including primary, secondary, accent, etc.
  - `ThemeTypography`: Defines typography settings including font family and styles
  - `ThemeSpacing`: Defines spacing scale for consistent layout
  - `ThemeBorderRadius`: Defines border radius variations
  - `ThemeConfig`: Combines all theme components
- Extended the main `Theme` interface to include:
  - `specialty`: To identify which medical specialty theme is active
  - `config`: To hold the theme-specific styling configuration

These types will be used throughout the application to maintain consistent theming across different medical specialties while preserving the existing theme functionality for direction, mode, and layout.

### Implementation Details
File modified: `src/@types/theme.ts`

Next steps will involve creating theme configurations for each medical specialty and updating the theme store to support switching between themes.

## Step 2: Create Zustand Theme Store

In this step, we updated the Zustand theme store to support multiple medical specialty themes:

1. Extended the theme store to track the current theme specialty ('default', 'organTransplant', 'cosmeticSurgery')
2. Added a new `setSpecialty` action to change the active theme
3. Configured the store to persist theme selection in localStorage
4. Created specialty theme configurations for each medical specialty:
   - Default theme: Blue color scheme for general medical practice
   - Organ Transplant theme: Teal color scheme representing medical specialization
   - Cosmetic Surgery theme: Pink/Purple color scheme emphasizing aesthetics

The updated theme store now properly handles theme switching and persistence, allowing users to maintain their theme preference across sessions.

### Implementation Details
Files modified:
- `src/store/themeStore.ts`: Updated with specialty support and persistence
- `src/configs/specialty-themes.config.ts`: Created to define theme configurations for each specialty

Next steps will involve implementing a theme selection interface to allow users to switch between different medical specialty themes.

## Step 3: Create Base Theme Configuration Files

In this step, we created detailed base theme configuration files that serve as the foundation for our medical specialty themes. These files establish a comprehensive design system that can be extended or overridden by specialty-specific themes.

### Colors Configuration

We created a detailed color system in `src/views/Home/themes/base/colors.ts` with the following features:

1. **Hierarchical Color Organization**:
   - Primary colors (default, deep, mild variants)
   - Secondary colors (default, deep, mild variants)
   - Accent color for call-to-action elements
   - Background and surface colors for layering
   - Text colors with multiple emphasis levels
   - Status colors for feedback and notifications
   - Border colors for UI boundaries
   - Overlay colors for modal backgrounds
   - Medical-specific colors for specialty contexts

2. **Semantic Naming**:
   - Colors are named by their purpose rather than their visual appearance
   - Each color has a clear intent in the UI
   - Comments explain the purpose and usage of each color

3. **Accessibility Considerations**:
   - Color contrasts designed to meet WCAG accessibility guidelines
   - Text colors optimized for readability in medical contexts

### Typography Configuration

We created a comprehensive typography system in `src/views/Home/themes/base/typography.ts` with the following features:

1. **Font Families**:
   - Primary font for general UI text
   - Secondary font for headings
   - Monospace font for medical data and codes
   - System font fallbacks for optimal performance

2. **Modular Type Scale**:
   - Consistent size relationships from XS (0.75rem) to 6XL (4rem)
   - Clear comments explaining the intended use for each size

3. **Vertical Rhythm Control**:
   - Six line-height options from tight (1) to loose (2)
   - Optimized for different content types and readability requirements

4. **Font Weight Spectrum**:
   - Full range from thin (100) to black (900)
   - Semantic descriptions for appropriate usage

5. **Advanced Typography Controls**:
   - Letter spacing options for different text styles
   - Text transformation utilities
   - Component-specific typography presets for consistent application

These base configuration files provide a robust foundation that ensures consistency across the application while allowing for specialty-specific customizations.

### Implementation Details
Files created:
- `src/views/Home/themes/base/colors.ts`: Base color system
- `src/views/Home/themes/base/typography.ts`: Base typography system

Next steps will involve creating specialty-specific theme configurations that extend these base themes for Organ Transplant and Cosmetic Surgery specialties.

## Step 4: Create Organ Transplant Theme

In this step, we created a specialized theme for the Organ Transplant specialty. This theme was designed to convey trust, precision, and hope - critical aspects in organ transplantation communication.

### Colors Configuration

We created a specialized color system in `src/views/Home/themes/organTransplant/colors.ts` with the following features:

1. **Primary Color Palette**:
   - Used teal/green tones (#00796B, #004D40) representing life, renewal, and medical expertise
   - Deep and mild variations for creating visual hierarchy

2. **Secondary Color Palette**:
   - Used amber/gold tones (#FFC107, #FFA000) representing hope, value, and positive outcomes
   - Provides warm contrast to the cool primary palette

3. **Specialty-Specific Colors**:
   - Added transplant-specific semantic colors for donors, recipients, matching, waitlist, etc.
   - Created a timeline color system for representing the transplant journey
   - Customized status colors to harmonize with the teal theme

4. **Professional Atmosphere**:
   - Carefully selected text colors for optimal readability against the teal/green theme
   - Semi-transparent teal overlay for modal backgrounds
   - Subtle background with very slight green tint for a calming effect

### Typography Configuration

We created specialized typography settings in `src/views/Home/themes/organTransplant/typography.ts` with these key features:

1. **Professional Font Combination**:
   - Serif fonts (Merriweather) for headings to convey authority and trust
   - Sans-serif fonts (Roboto) for body text to maintain readability of medical information
   - Monospace fonts for medical codes and data

2. **Formal Sizing System**:
   - Slightly more conservative font size scale for the formal medical context
   - Refined heading sizes to convey appropriate hierarchy while maintaining professionalism

3. **Specialty-Specific Typography**:
   - Added transplant-specific component typography for:
     - Patient status indicators
     - Organ compatibility information
     - Medical timeline events
     - Medical statistics

4. **Improved Readability**:
   - Adjusted line heights for optimal readability of complex medical information
   - Customized letter spacing for different text categories
   - Careful font weight selection for clear information hierarchy

The Organ Transplant theme maintains the same structure as the base theme while customizing the values to create a distinct visual identity appropriate for the specialty.

### Implementation Details
Files created:
- `src/views/Home/themes/organTransplant/colors.ts`: Organ Transplant color system
- `src/views/Home/themes/organTransplant/typography.ts`: Organ Transplant typography system
- `src/views/Home/themes/organTransplant/index.ts`: Convenient theme exports

Next steps will involve creating the Cosmetic Surgery specialty theme, which will have a distinctly different aesthetic appropriate for that medical specialty.

## Step 5: Create Cosmetic Surgery Theme

In this step, we created a specialized theme for the Cosmetic Surgery specialty. This theme was designed to convey elegance, modernity, and aesthetic refinement - essential aspects in cosmetic and aesthetic medicine communication.

### Colors Configuration

We created a sophisticated color system in `src/views/Home/themes/cosmeticSurgery/colors.ts` with the following features:

1. **Primary Color Palette**:
   - Used pink/rose tones (#E91E63, #C2185B) representing beauty and transformation
   - Deep and mild variations for creating visual hierarchy and subtle accents

2. **Secondary Color Palette**:
   - Used light blue tones (#03A9F4, #0288D1) representing clarity and precision
   - Provides cool contrast to the warm primary palette
   - Creates a modern, sophisticated color combination

3. **Specialty-Specific Colors**:
   - Added cosmetic-specific semantic colors for different phases (preOperative, procedure, recovery, etc.)
   - Created treatment-specific color coding (surgical, nonSurgical, skinCare, antiAging)
   - Implemented before/after comparison colors for transformation representation

4. **Elegant Atmosphere**:
   - Light, clean background colors creating a minimalist feel
   - Very light pink overlay for modal backgrounds
   - Sophisticated purple accent color to complement the primary pink

### Typography Configuration

We created specialized typography settings in `src/views/Home/themes/cosmeticSurgery/typography.ts` with these key features:

1. **Modern Font Combination**:
   - Light, refined sans-serif fonts (Montserrat) for body text providing a modern aesthetic
   - Elegant serif font (Playfair Display) for headings adding sophistication
   - Careful balance of modern and classic elements

2. **Golden Ratio Typography**:
   - Heading sizes follow the golden ratio (1:1.618) for natural, pleasing proportions
   - More dramatic scale for visual interest appropriate for aesthetic medicine

3. **Luxury Typographic Details**:
   - Favoring lighter font weights for elegance
   - More generous line heights for an open, airy feel
   - Extended letter spacing for refinement
   - Added smallCaps text transform option for stylistic flourishes

4. **Specialty-Specific Typography**:
   - Added cosmetic-specific component typography for:
     - Procedure names with elegant serif styling
     - Testimonials with lighter weight and italic style
     - Before/After captions with uppercase transformation
     - Statistical highlights with extra-light weights for elegant display
     - Promotional text optimized for marketing messaging

The Cosmetic Surgery theme maintains the same structure as the base theme while completely transforming the aesthetic to create a distinct visual identity appropriate for cosmetic and aesthetic medicine.

### Implementation Details
Files created:
- `src/views/Home/themes/cosmeticSurgery/colors.ts`: Cosmetic Surgery color system
- `src/views/Home/themes/cosmeticSurgery/typography.ts`: Cosmetic Surgery typography system
- `src/views/Home/themes/cosmeticSurgery/index.ts`: Convenient theme exports

Next steps will involve creating a theme selection interface component that allows users to switch between the different medical specialty themes.

## Step 6: Create Theme CSS Variables

In this step, we created a CSS file that defines variables for all our themes, making it easy to apply these themes throughout the application using class selectors.

### CSS Variables Structure

We created `themes.css` in the `src/assets/styles/` directory with the following structure:

1. **Root Variables (Default Theme)**:
   - The `:root` selector contains CSS variables for the default medical theme
   - These variables serve as the base theme and are applied by default

2. **Theme-specific Class Selectors**:
   - `.theme-organTransplant` class contains variables for the Organ Transplant theme
   - `.theme-cosmeticSurgery` class contains variables for the Cosmetic Surgery theme
   - Each theme maintains the same variable names but with different values

### Variables Categories

For each theme, we defined CSS variables for:

1. **Colors**:
   - Primary colors (default, deep, mild variants)
   - Secondary colors (default, deep, mild variants)
   - Accent color
   - Background and surface colors
   - Text colors with various emphasis levels
   - Status colors (success, error, warning, info)
   - Border and overlay colors
   - Medical and specialty-specific colors

2. **Typography**:
   - Font families (primary, secondary, mono, system)
   - Font sizes using a consistent scale
   - Line heights for different text contexts
   - Font weights covering the full spectrum
   - Letter spacing options

### Theme Application Approach

With this CSS structure, applying a theme throughout the application is as simple as adding the corresponding class name to the root HTML element:

- Default theme: No additional class needed (uses `:root`)
- Organ Transplant theme: Add `.theme-organTransplant` to the root element
- Cosmetic Surgery theme: Add `.theme-cosmeticSurgery` to the root element

This approach allows for:
- Easy theme switching without page reload
- Consistent application of theme styles
- Simplified component development using CSS variables

### Implementation Details
File created:
- `src/assets/styles/themes.css`: CSS variables for all themes

Next steps will involve integrating the CSS variables with our React components and creating a ThemeProvider component to handle theme switching.