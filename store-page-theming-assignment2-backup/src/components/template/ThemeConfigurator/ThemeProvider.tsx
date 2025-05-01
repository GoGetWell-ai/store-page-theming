/* Defines the structure for theme properties and configuration */
export interface Theme {
    primary: string; // Main color
    primaryDeep: string; // Darker shade of main color
    primaryMild: string; // Lighter shade of main color
    secondary: string; // Secondary color for accents
    background: string; // Background color
    text: string; // Text color
    fontFamily: string; // Font style
    fontSize: {
      h1: string; // Heading 1 size
      h2: string; // Heading 2 size
      body: string; // Body text size
    };
    spacing: {
      small: string; // Small spacing
      medium: string; // Medium spacing
      large: string; // Large spacing
    };
  }
  
  export interface ThemeConfig {
    specialty: 'default' | 'organ-transplant' | 'cosmetic-surgery'; // Theme type
    config: Theme; // Theme properties
  }