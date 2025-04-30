/**
 * Organ Transplant Specialty Theme Colors
 * 
 * This file defines the color palette specific to the Organ Transplant medical specialty.
 * The colors are chosen to convey trust, precision, and hope - critical aspects of organ transplantation.
 * 
 * Color scheme focuses on:
 * - Teal/green primary colors representing life, renewal, and medical expertise
 * - Amber/gold secondary colors representing value, care, and optimism
 * - Professional, calm palette suitable for sensitive medical information
 */

import { baseColors } from '../base/colors'

export const organTransplantColors = {
  // Primary colors - teal/green tones representing life and renewal
  primary: {
    default: '#00796B',  // Main primary color - balanced teal, representing medical expertise
    deep: '#004D40',     // Darker variant - for emphasis and depth
    mild: '#B2DFDB',     // Lighter variant - for backgrounds and subtle accents
  },

  // Secondary colors - amber/gold tones representing hope and positive outcomes
  secondary: {
    default: '#FFC107',  // Main secondary color - optimistic amber
    deep: '#FFA000',     // Darker variant - for hover states and emphasis
    mild: '#FFECB3',     // Lighter variant - for backgrounds and highlighting
  },

  // Accent color - used sparingly for important actions or callouts
  accent: '#26A69A',     // Brighter teal - complementary to primary but more attention-grabbing

  // Background colors - softer, professional tones
  background: '#F5F7F6', // Very slight green tint to white - easy on the eyes
  surface: '#FFFFFF',    // Pure white - for cards and content areas

  // Text colors - optimized for readability against the teal/green theme
  text: {
    default: '#263238',  // Dark blue-gray - less harsh than pure black
    light: '#546E7A',    // Medium blue-gray - for secondary information
    dark: '#0D2C28',     // Very dark teal - for headlines and important content
    disabled: '#90A4AE', // Light blue-gray - for inactive elements
  },

  // Status colors - slightly adjusted to harmonize with the teal theme
  status: {
    success: '#2E7D32',  // Dark green - indicating successful operations
    error: '#D32F2F',    // Red - indicating errors or issues
    warning: '#F57C00',  // Deep orange - complementary to teal, for warnings
    info: '#0277BD',     // Deep blue - for informational messages
  },

  // Border colors - subtle coordination with the main palette
  border: {
    default: '#E0E0E0',  // Standard light gray border
    focus: '#26A69A',    // Teal focus border - matching accent color
  },

  // Overlay colors - for modal backgrounds
  overlay: 'rgba(0, 77, 64, 0.4)', // Semi-transparent dark teal
  
  // Medical-specific colors - specialized for organ transplantation
  medical: {
    // Original colors from base theme
    emergency: '#D50000',
    prescription: '#7E57C2',

    // Transplant-specific colors
    donor: '#2E7D32',         // Green - representing organ donors
    recipient: '#1565C0',     // Blue - representing organ recipients
    match: '#00897B',         // Teal - representing successful matches
    waitlist: '#FF8F00',      // Amber - representing waitlist status
    postOperative: '#9E9D24', // Olive - representing recovery/follow-up
  },
  
  // Specialty-specific UI element colors
  specialty: {
    charts: {
      success: '#2E7D32',
      pending: '#FFA000',
      rejected: '#D32F2F',
    },
    timeline: {
      evaluation: '#26A69A',
      waitlist: '#FFC107',
      match: '#66BB6A',
      surgery: '#EF6C00',
      recovery: '#42A5F5',
      followUp: '#7E57C2'
    }
  }
}