/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    './safelist.txt'
  ],
  safelist: [
    {
      pattern: /^bg-(primary|error|success|info|warning)(-subtle)?$/,
      variants: ['before', 'hover', 'focus'],
    },
    {
      pattern: /^text-(primary|error|success|info|warning)(-subtle)?$/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /^border-(primary|error|success|info|warning)(-subtle)?$/,
      variants: ['hover', 'focus'],
    }
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-deep': 'var(--primary-deep)',
        'primary-mild': 'var(--primary-mild)',
        'primary-subtle': 'var(--primary-subtle)',
        'secondary': 'var(--secondary)',
        'background': 'var(--background)',
        'card-bg': 'var(--card-bg)',
        'text': 'var(--text)',
        'text-light': 'var(--text-light)',
        'border': 'var(--border)',
        'error': 'var(--error)',
        'error-subtle': 'var(--error-subtle)',
        'success': 'var(--success)',
        'success-subtle': 'var(--success-subtle)',
        'info': 'var(--info)',
        'info-subtle': 'var(--info-subtle)',
        'warning': 'var(--warning)',
        'warning-subtle': 'var(--warning-subtle)',
        'hero-bg': 'var(--hero-bg)',
        'hero-text': 'var(--hero-text)',
        'menu-bg': 'var(--menu-bg)',
        'menu-text': 'var(--menu-text)',
        'menu-hover': 'var(--menu-hover)',
        'menu-active': 'var(--menu-active)',
        'menu-active-text': 'var(--menu-active-text)',
        'menu-border': 'var(--menu-border)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            maxWidth: '65ch',
            fontFamily: 'var(--font-family)',
            lineHeight: 'var(--line-height)',
            h1: {
              fontFamily: 'var(--heading-font)',
              fontWeight: 'var(--heading-weight)',
            },
            h2: {
              fontFamily: 'var(--heading-font)',
              fontWeight: 'var(--heading-weight)',
            },
            h3: {
              fontFamily: 'var(--heading-font)',
              fontWeight: 'var(--heading-weight)',
            },
            h4: {
              fontFamily: 'var(--heading-font)',
              fontWeight: 'var(--heading-weight)',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.text-light'),
          },
        },
      }),
      borderRadius: {
        'button': 'var(--button-radius)',
        'card': 'var(--card-radius)',
        'input': 'var(--input-radius)',
      },
      boxShadow: {
        'theme': 'var(--shadow)',
        'theme-md': 'var(--shadow-md)',
        'menu': 'var(--menu-shadow)',
      },
      height: {
        'hero': 'var(--hero-height)',
      },
      fontSize: {
        'body': 'var(--body-font-size)',
      },
      fontFamily: {
        'theme': 'var(--font-family)',
        'heading': 'var(--heading-font)',
      },
      fontWeight: {
        'heading': 'var(--heading-weight)',
        'body': 'var(--body-weight)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delay': 'float 5s ease-in-out 1s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'gradient': 'gradient 8s ease infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'sparkle-delay': 'sparkle 2s ease-in-out 0.5s infinite',
        'sparkle-slow': 'sparkle 3s ease-in-out 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};