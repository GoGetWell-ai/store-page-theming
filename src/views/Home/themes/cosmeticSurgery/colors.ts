/**
 * Cosmetic Surgery Specialty Theme Colors
 * 
 * This file defines the color palette specific to the Cosmetic Surgery medical specialty.
 * The colors are chosen to convey elegance, transformation, and aesthetic refinement -
 * essential aspects of cosmetic and aesthetic medicine.
 * 
 * Color scheme focuses on:
 * - Pink/rose primary colors representing beauty, transformation, and revitalization
 * - Light blue secondary colors representing clarity, precision, and professionalism
 * - Refined, sophisticated palette suitable for aesthetic medicine presentation
 */

import { baseColors } from '../base/colors'

export const cosmeticSurgeryColors = {
  // Primary colors - pink/rose tones representing beauty and transformation
  primary: {
    default: '#E91E63',  // Main primary color - vibrant pink, representing aesthetics
    deep: '#C2185B',     // Darker variant - for emphasis and depth
    mild: '#F8BBD0',     // Lighter variant - for backgrounds and subtle accents
  },

  // Secondary colors - light blue tones representing clarity and precision
  secondary: {
    default: '#03A9F4',  // Main secondary color - bright blue
    deep: '#0288D1',     // Darker variant - for hover states and emphasis
    mild: '#B3E5FC',     // Lighter variant - for backgrounds and highlighting
  },

  // Accent color - used for important callouts and specific UI elements
  accent: '#9C27B0',     // Purple accent - complementary to pink, adds sophistication

  // Background colors - light, clean tones
  background: '#FAFAFA', // Almost white - creating a clean, minimalist feel
  surface: '#FFFFFF',    // Pure white - for cards, dialogs and content areas

  // Text colors - refined palette for elegance
  text: {
    default: '#212121',  // Near-black - for primary content
    light: '#757575',    // Medium gray - for secondary information
    dark: '#000000',     // Pure black - for maximum contrast when needed
    disabled: '#BDBDBD', // Light gray - for inactive elements
  },

  // Status colors - slightly adjusted to match the aesthetic theme
  status: {
    success: '#4CAF50',  // Green - for successful operations
    error: '#F44336',    // Red - for errors or issues
    warning: '#FF9800',  // Orange - for warnings
    info: '#2196F3',     // Blue - for informational messages
  },

  // Border colors - subtle, elegant
  border: {
    default: '#E0E0E0',  // Light gray - standard borders
    focus: '#E91E63',    // Pink - for focused elements, matching primary
  },

  // Overlay colors - for modal backgrounds
  overlay: 'rgba(233, 30, 99, 0.15)', // Very light pink overlay
  
  // Medical-specific colors - specialized for cosmetic surgery
  medical: {
    // Original colors from base theme
    emergency: '#D50000',
    prescription: '#7E57C2',

    // Cosmetic-specific colors
    preOperative: '#00ACC1',    // Teal - representing preparation phase
    procedure: '#E91E63',       // Pink - representing the cosmetic procedure
    recovery: '#AB47BC',        // Purple - representing healing and transformation
    results: '#EC407A',         // Bright pink - representing successful outcomes
    consultation: '#29B6F6',    // Light blue - representing client consultations
  },
  
  // Specialty-specific UI element colors
  specialty: {
    treatments: {
      surgical: '#E91E63',      // Pink - for surgical procedures
      nonSurgical: '#03A9F4',   // Blue - for non-surgical procedures
      skinCare: '#9C27B0',      // Purple - for skincare treatments
      antiAging: '#00BCD4',     // Teal - for anti-aging treatments
    },
    beforeAfter: {
      before: '#90A4AE',        // Muted blue-gray - for "before" states
      after: '#EC407A',         // Bright pink - for "after" states
      arrow: '#03A9F4',         // Blue - for transition indicators
    },
    galleries: {
      background: '#FAFAFA',    // Almost white - clean gallery background
      border: '#F5F5F5',        // Very light gray - subtle image borders
      caption: '#757575',       // Medium gray - for image captions
    }
  }
}