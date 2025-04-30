/**
 * Base Colors Configuration
 * 
 * This file defines the core color palette for the medical website theming system.
 * These colors provide the foundation that specialty-specific themes will extend or override.
 * 
 * Color naming follows a semantic approach, where each color has a purpose in the UI.
 * Each primary color includes deep (darker) and mild (lighter) variations.
 */

export const baseColors = {
  // Primary color family - used for primary actions, main navigation, and key UI elements
  primary: {
    default: '#1976d2',  // Main primary color - balanced medium blue, good for accessibility
    deep: '#0d47a1',     // Darker variant - useful for hover states and emphasis
    mild: '#bbdefb',     // Lighter variant - useful for backgrounds and subtle accents
  },

  // Secondary color family - used for secondary actions, less prominent UI elements
  secondary: {
    default: '#26a69a',  // Main secondary color - teal, complementary to primary blue
    deep: '#00796b',     // Darker variant - for hover states and emphasis
    mild: '#b2dfdb',     // Lighter variant - for backgrounds and highlighting
  },

  // Accent color - used sparingly for highlighting critical elements or calls to action
  accent: '#ff4081',     // Bright pink accent - provides strong contrast against blues/teals

  // Background colors - used for page backgrounds and component surfaces
  background: '#f5f7fa', // Light gray-blue - easy on the eyes for a medical context
  surface: '#ffffff',    // Pure white - for cards, dialogs, and content containers

  // Text colors - various options for different emphasis levels
  text: {
    default: '#37474f',  // Default text - dark blue-gray, less harsh than pure black
    light: '#78909c',    // Light text - for secondary information and less emphasis
    dark: '#102a43',     // Dark text - for headlines and important content
    disabled: '#b0bec5', // Disabled text - for inactive UI elements
  },

  // Status colors - used to communicate system status and feedback
  status: {
    success: '#4caf50',  // Green - indicating successful operations
    error: '#f44336',    // Red - indicating errors or critical issues
    warning: '#ff9800',  // Orange - indicating potential issues or warnings
    info: '#2196f3',     // Blue - indicating informational messages
  },

  // Border colors - used for separating content and defining UI boundaries
  border: {
    default: '#e0e0e0',  // Standard border - subtle gray
    focus: '#2196f3',    // Focus border - blue, indicating keyboard focus
  },

  // Overlay colors - used for modals, drawers, and other overlay UI elements
  overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black - for modal backgrounds
  
  // Medical-specific colors - common colors used in medical interfaces
  medical: {
    emergency: '#d50000',     // Bright red - for critical/emergency information
    prescription: '#7e57c2',  // Purple - commonly associated with medication
    diagnosis: '#00838f',     // Teal - for diagnostic information
    vitals: '#2e7d32',        // Green - for patient vital signs
  }
}