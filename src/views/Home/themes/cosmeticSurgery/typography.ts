/**
 * Cosmetic Surgery Specialty Theme Typography
 *
 * This file defines typography settings specific to the Cosmetic Surgery medical specialty.
 * The typography choices emphasize elegance, modernity, and aesthetic refinement -
 * essential qualities for communicating in the field of aesthetic and cosmetic medicine.
 *
 * Key typographic features:
 * - Light, refined sans-serif fonts for a modern aesthetic
 * - Carefully calibrated type scale emphasizing elegance
 * - Generous spacing and lighter font weights for sophistication
 * - Specialized typography components for aesthetic medicine
 */

import { baseTypography } from '../base/typography'

export const cosmeticSurgeryTypography = {
    // Font families - using modern, elegant typefaces
    fontFamily: {
        // Primary font for body text - light, modern feel
        primary: '"Montserrat", "Helvetica Neue", -apple-system, sans-serif',

        // Secondary font for headings - more refined and elegant
        secondary: '"Playfair Display", "Georgia", "Times New Roman", serif',

        // Monospace font - same as base
        mono: '"Roboto Mono", "Courier New", monospace',

        // System fonts fallback
        system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    },

    // Font sizes - slightly more refined scale for elegance
    fontSize: {
        // Base sizes - similar to base theme but with subtle adjustments
        xs: '0.75rem', // 12px - fine print
        sm: '0.875rem', // 14px - secondary text
        base: '1rem', // 16px - body text
        lg: '1.125rem', // 18px - emphasized body text
        xl: '1.25rem', // 20px - subheadings

        // Heading sizes - more dramatic scale for visual interest
        '2xl': '1.563rem', // 25px - h3, slightly larger than base
        '3xl': '1.953rem', // 31px - h2, following golden ratio
        '4xl': '2.441rem', // 39px - h1, following golden ratio
        '5xl': '3.052rem', // 49px - display headings
        '6xl': '3.815rem', // 61px - hero text
    },

    // Line heights - more generous for an elegant, open feel
    lineHeight: {
        none: '1', // No extra space - only for special cases
        tight: '1.25', // Compact
        snug: '1.375', // Slightly compact
        normal: '1.6', // Slightly more generous than base theme
        relaxed: '1.75', // Spacious - for body text
        loose: '2', // Very spacious - for certain aesthetic elements
    },

    // Font weights - favoring lighter weights for elegance
    fontWeight: {
        thin: '100', // Used for aesthetic display text
        extralight: '200', // Used for aesthetic headings
        light: '300', // Used frequently for elegance
        normal: '400', // Standard body text
        medium: '500', // Moderately emphasized text
        semibold: '600', // Secondary headings
        bold: '700', // Primary headings and important text
        extrabold: '800', // Very limited use
        black: '900', // Very limited use
    },

    // Letter spacing - more attention to spacing for refinement
    letterSpacing: {
        tightest: '-0.05em', // Very tight - special cases only
        tighter: '-0.025em', // Tight - for certain headings
        tight: '-0.01em', // Slightly tight
        normal: '0', // Default
        wide: '0.025em', // Slightly wide - for certain body text
        wider: '0.05em', // Wide - often used for elegance
        widest: '0.1em', // Very wide - for all caps and aesthetic elements
        aesthetic: '0.15em', // Extra wide - for stylized elements
    },

    // Text transforms - same as base with additions
    textTransform: {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
        normalCase: 'none',
        smallCaps: 'small-caps', // Added for aesthetic elements
    },

    // Component-specific typography - customized for cosmetic surgery context
    components: {
        // Page titles - elegant serif font
        pageTitle: {
            fontSize: '2.441rem', // 39px
            fontWeight: '300', // Light weight for elegance
            lineHeight: '1.25',
            fontFamily:
                '"Playfair Display", "Georgia", "Times New Roman", serif',
            letterSpacing: '-0.01em',
        },

        // Section headings - elegant with refined spacing
        sectionHeading: {
            fontSize: '1.563rem', // 25px
            fontWeight: '400', // Regular weight
            lineHeight: '1.35',
            fontFamily:
                '"Playfair Display", "Georgia", "Times New Roman", serif',
            letterSpacing: '-0.01em',
        },

        // Card titles - clean and modern
        cardTitle: {
            fontSize: '1.25rem', // 20px
            fontWeight: '500', // Medium weight
            lineHeight: '1.3',
            fontFamily:
                '"Montserrat", "Helvetica Neue", -apple-system, sans-serif',
        },

        // Navigation items - modern, refined
        navItem: {
            fontSize: '0.875rem', // 14px
            fontWeight: '400', // Regular weight
            lineHeight: '1.5',
            fontFamily:
                '"Montserrat", "Helvetica Neue", -apple-system, sans-serif',
            letterSpacing: '0.05em', // Wider spacing
        },

        // Form labels - clean, elegant
        formLabel: {
            fontSize: '0.875rem', // 14px
            fontWeight: '500', // Medium weight
            lineHeight: '1.5',
            letterSpacing: '0.05em', // Wider spacing
        },

        // Buttons - refined
        button: {
            fontSize: '0.875rem', // 14px
            fontWeight: '400', // Regular weight
            lineHeight: '1',
            letterSpacing: '0.05em', // Wider spacing
            textTransform: 'uppercase',
        },

        // Medical data - same as base
        medicalData: {
            fontSize: '0.875rem', // 14px
            fontWeight: '400', // Regular weight
            lineHeight: '1.5',
            fontFamily: '"Roboto Mono", "Courier New", monospace',
        },

        // Cosmetic surgery specific components
        cosmetic: {
            // Procedure name styling
            procedureName: {
                fontSize: '1.25rem',
                fontWeight: '300', // Light weight for elegance
                letterSpacing: '0.025em',
                lineHeight: '1.3',
                fontFamily:
                    '"Playfair Display", "Georgia", "Times New Roman", serif',
            },

            // Testimonial styling
            testimonial: {
                fontSize: '1.125rem',
                fontWeight: '300', // Light weight for authenticity
                lineHeight: '1.7', // Generous line height for readability
                fontStyle: 'italic',
            },

            // Before/After caption
            beforeAfterCaption: {
                fontSize: '0.75rem',
                fontWeight: '500', // Medium weight for clarity
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
            },

            // Statistical highlights (e.g., satisfaction rates)
            stats: {
                fontSize: '2.5rem',
                fontWeight: '200', // Extra light for elegant display
                lineHeight: '1',
                fontFamily:
                    '"Montserrat", "Helvetica Neue", -apple-system, sans-serif',
            },

            // Promotional text
            promotional: {
                fontSize: '1.125rem',
                fontWeight: '300', // Light weight
                lineHeight: '1.6',
                letterSpacing: '0.01em',
            },
        },
    },
}
