/**
 * Organ Transplant Specialty Theme Typography
 * 
 * This file defines typography settings specific to the Organ Transplant medical specialty.
 * The typography choices emphasize professionalism, trustworthiness, and clarity -
 * essential qualities for communicating complex organ transplant information.
 * 
 * Key typographic features:
 * - Serif fonts for headings to convey authority and trust
 * - Sans-serif for body text to maintain readability of medical information
 * - Slightly more conservative spacing and sizing for a formal medical feel
 */

import { baseTypography } from '../base/typography'

export const organTransplantTypography = {
  // Font families - using serif for headings to convey authority and trust
  fontFamily: {
    // Primary font for body text - maintaining readability for technical medical content
    primary: '"Roboto", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
    
    // Secondary font for headings - serif font conveying professionalism and authority
    secondary: '"Merriweather", "Georgia", "Times New Roman", serif',
    
    // Monospace font for medical codes, IDs, and data - maintaining same as base
    mono: '"Roboto Mono", "Courier New", monospace',
    
    // System fonts fallback - same as base
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },

  // Font sizes - slightly more conservative than base theme for formal medical context
  fontSize: {
    // Base sizes - same as base theme for consistency
    xs: '0.75rem',      // 12px - footnotes, disclaimers
    sm: '0.875rem',     // 14px - secondary information
    base: '1rem',       // 16px - default body text
    lg: '1.125rem',     // 18px - important body text
    xl: '1.25rem',      // 20px - subheadings
    
    // Heading sizes - slightly more refined scale for medical formality
    '2xl': '1.5rem',    // 24px - h3, section headings
    '3xl': '1.75rem',   // 28px - h2, slightly smaller than base for formality
    '4xl': '2.125rem',  // 34px - h1, slightly smaller than base for formality
    '5xl': '2.75rem',   // 44px - main headings, slightly smaller than base
    '6xl': '3.5rem',    // 56px - display text, slightly smaller than base
  },

  // Line heights - slightly tighter for more formal presentation
  lineHeight: {
    none: '1',          // No extra space - used sparingly
    tight: '1.2',       // Compact - for headings (tighter than base)
    snug: '1.35',       // Slightly compact - for subheadings (tighter than base)
    normal: '1.5',      // Standard - for body text (same as base)
    relaxed: '1.625',   // Spacious - for improved readability (same as base)
    loose: '2',         // Very spacious - for specific needs (same as base)
  },

  // Font weights - emphasizing medium and bold for clarity in medical context
  fontWeight: {
    thin: '100',        // Rarely used in medical context
    extralight: '200',  // Rarely used in medical context
    light: '300',       // Used sparingly for non-critical information
    normal: '400',      // Standard body text
    medium: '500',      // Emphasized text - used frequently
    semibold: '600',    // Important information - used frequently
    bold: '700',        // Key headlines and critical information
    extrabold: '800',   // Major headings
    black: '900',       // Very limited use
  },

  // Letter spacing - slightly tighter for headings, normal for body
  letterSpacing: {
    tighter: '-0.05em', // For serif headings
    tight: '-0.025em',  // For subheadings
    normal: '0',        // Standard spacing
    wide: '0.025em',    // Improved readability for small text
    wider: '0.05em',    // For labels
    widest: '0.1em',    // For all-caps text
  },

  // Text transforms - same as base
  textTransform: {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    normalCase: 'none',
  },

  // Component-specific typography - customized for organ transplant context
  components: {
    // Page titles - using serif font for authority
    pageTitle: {
      fontSize: '2.125rem', // 34px - slightly smaller than base
      fontWeight: '700',
      lineHeight: '1.2',
      fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif',
    },
    
    // Section headings - using serif font for consistency
    sectionHeading: {
      fontSize: '1.5rem', // 24px
      fontWeight: '600',
      lineHeight: '1.35',
      fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif',
    },
    
    // Card titles - using serif font for authority
    cardTitle: {
      fontSize: '1.25rem', // 20px
      fontWeight: '600',
      lineHeight: '1.2',
      fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif',
    },
    
    // Navigation items - sans-serif for readability
    navItem: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.5',
      fontFamily: '"Roboto", "Segoe UI", sans-serif',
    },
    
    // Form labels - slightly more prominent
    formLabel: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.5',
      letterSpacing: '0.01em',
    },
    
    // Buttons - clear and prominent
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1',
      letterSpacing: '0.01em',
    },
    
    // Medical data - monospace for clarity of medical codes and IDs
    medicalData: {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: '"Roboto Mono", "Courier New", monospace',
    },
    
    // Transplant-specific components
    transplant: {
      // Patient status indicators
      statusLabel: {
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
      
      // Organ compatibility information
      compatibilityData: {
        fontSize: '0.9375rem', // 15px
        fontWeight: '500',
        lineHeight: '1.4',
        fontFamily: '"Roboto Mono", "Courier New", monospace',
      },
      
      // Medical timeline events
      timelineEvent: {
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.4',
      },
      
      // Medical statistics
      stats: {
        fontSize: '1.125rem',
        fontWeight: '700',
        lineHeight: '1.2',
        fontFamily: '"Roboto", "Segoe UI", sans-serif',
      },
    }
  }
}