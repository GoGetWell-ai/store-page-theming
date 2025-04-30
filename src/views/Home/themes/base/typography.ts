/**
 * Base Typography Configuration
 * 
 * This file defines the core typography settings for the medical website theming system.
 * These settings establish a comprehensive type system that specialty themes can extend or override.
 * 
 * The typography system is designed to:
 * - Ensure readability across different device sizes
 * - Maintain consistent visual hierarchy
 * - Support accessibility requirements
 * - Accommodate medical terminology and content needs
 */

export const baseTypography = {
  // Font families
  fontFamily: {
    // Primary font for most UI text - clean, professional, and highly readable
    primary: '"Roboto", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
    
    // Secondary font for headings - slightly more distinctive while maintaining professionalism
    secondary: '"Inter", "Roboto", "Segoe UI", sans-serif',
    
    // Monospace font for code, medical IDs, etc. - ensures equal character width
    mono: '"Roboto Mono", "Courier New", monospace',
    
    // System fonts fallback - optimized for each operating system
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },

  // Font sizes - using a modular scale for consistent sizing relationships
  fontSize: {
    // Base sizes
    xs: '0.75rem',      // 12px - very small text, footnotes
    sm: '0.875rem',     // 14px - small text, secondary information
    base: '1rem',       // 16px - default body text size
    lg: '1.125rem',     // 18px - slightly larger body text
    xl: '1.25rem',      // 20px - subheadings
    
    // Heading sizes
    '2xl': '1.5rem',    // 24px - h3, small section headings
    '3xl': '1.875rem',  // 30px - h2, major section headings
    '4xl': '2.25rem',   // 36px - h1, page titles
    '5xl': '3rem',      // 48px - hero text, very large headings
    '6xl': '4rem',      // 64px - display text, extremely large headings
  },

  // Line heights - ensuring proper vertical rhythm and readability
  lineHeight: {
    none: '1',          // No extra space - used sparingly for special cases
    tight: '1.25',      // Compact - for headings and short text
    snug: '1.375',      // Slightly compact - for subheadings
    normal: '1.5',      // Standard - for body text and most content
    relaxed: '1.625',   // Spacious - for improved readability in longer paragraphs
    loose: '2',         // Very spacious - for specific design needs
  },

  // Font weights - providing flexibility for different emphasis levels
  fontWeight: {
    thin: '100',        // Extremely thin - special display text only
    extralight: '200',  // Very light - special display text
    light: '300',       // Light - secondary information
    normal: '400',      // Normal - standard body text
    medium: '500',      // Medium - slightly emphasized text
    semibold: '600',    // Semi-bold - subheadings and important text
    bold: '700',        // Bold - headings and key information
    extrabold: '800',   // Extra bold - major headings
    black: '900',       // Black - very strong emphasis, used sparingly
  },

  // Letter spacing - adjusting space between characters for readability and style
  letterSpacing: {
    tighter: '-0.05em', // Tighter - for specific aesthetic choices
    tight: '-0.025em',  // Slightly tighter - for headings
    normal: '0',        // Normal - no additional spacing
    wide: '0.025em',    // Slightly wider - improved readability for some fonts
    wider: '0.05em',    // Wider - for small caps or specialized text
    widest: '0.1em',    // Widest - for all caps headings or labels
  },

  // Text transforms - controlling text capitalization
  textTransform: {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    normalCase: 'none',
  },

  // Specific component presets - for consistent application across the UI
  components: {
    // Page titles
    pageTitle: {
      fontSize: '2.25rem', // 36px
      fontWeight: '700',
      lineHeight: '1.25',
      fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    },
    
    // Section headings
    sectionHeading: {
      fontSize: '1.5rem', // 24px
      fontWeight: '600',
      lineHeight: '1.375',
      fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    },
    
    // Card titles
    cardTitle: {
      fontSize: '1.25rem', // 20px
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: '"Roboto", "Segoe UI", sans-serif',
    },
    
    // Navigation items
    navItem: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.5',
      fontFamily: '"Roboto", "Segoe UI", sans-serif',
    },
    
    // Labels and form fields
    formLabel: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.5',
      letterSpacing: '0.025em',
    },
    
    // Buttons
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1',
      letterSpacing: '0.025em',
    },
    
    // Medical data presentation
    medicalData: {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: '"Roboto Mono", "Courier New", monospace',
    },
  }
}