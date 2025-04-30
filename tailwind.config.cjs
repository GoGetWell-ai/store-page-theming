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
					// Base theme colors using CSS variables
					'primary': 'var(--primary)',
					'primary-deep': 'var(--primary-deep)',
					'primary-mild': 'var(--primary-mild)',
					'primary-subtle': 'var(--primary-subtle)',
					'error': 'var(--error)',
					'error-subtle': 'var(--error-subtle)',
					'success': 'var(--success)',
					'success-subtle': 'var(--success-subtle)',
					'info': 'var(--info)',
					'info-subtle': 'var(--info-subtle)',
					'warning': 'var(--warning)',
					'warning-subtle': 'var(--warning-subtle)',
					'neutral': 'var(--neutral)',
					'gray-50': 'var(--gray-50)',
					'gray-100': 'var(--gray-100)',
					'gray-200': 'var(--gray-200)',
					'gray-300': 'var(--gray-300)',
					'gray-400': 'var(--gray-400)',
					'gray-500': 'var(--gray-500)',
					'gray-600': 'var(--gray-600)',
					'gray-700': 'var(--gray-700)',
					'gray-800': 'var(--gray-800)',
					'gray-900': 'var(--gray-900)',
					'gray-950': 'var(--gray-950)',
					
					// Specialty theme colors
					'secondary': 'var(--secondary)',
					'accent': 'var(--accent)',
					'background': 'var(--background)',
					'text': 'var(--text)',
					'muted': 'var(--muted)'
				},
				typography: (theme) => ({
					DEFAULT: {
						css: {
							color: theme('colors.gray.500'),
							maxWidth: '65ch',
							fontFamily: 'var(--font-family)',
						},
					},
					invert: {
						css: {
							color: theme('colors.gray.400'),
						},
					},
				}),
				fontFamily: {
					// Theme-specific font families
					'primary': 'var(--font-family)',
					'secondary': 'var(--heading-font-family)',
					'mono': 'var(--mono-font-family)'
				},
				fontSize: {
					// Custom font sizes using CSS variables
					'xs': 'var(--font-size-xs)',
					'sm': 'var(--font-size-sm)',
					'base': 'var(--font-size-base)',
					'lg': 'var(--font-size-lg)',
					'xl': 'var(--font-size-xl)',
					'2xl': 'var(--font-size-2xl)',
					'3xl': 'var(--font-size-3xl)',
					'4xl': 'var(--font-size-4xl)',
					'5xl': 'var(--font-size-5xl)',
					'6xl': 'var(--font-size-6xl)'
				},
				lineHeight: {
					// Theme-specific line heights
					'tight': 'var(--line-height-tight)',
					'snug': 'var(--line-height-snug)',
					'normal': 'var(--line-height-normal)',
					'relaxed': 'var(--line-height-relaxed)',
					'loose': 'var(--line-height-loose)'
				},
				borderRadius: {
					// Theme-specific border radius
					'none': 'var(--border-radius-none)',
					'sm': 'var(--border-radius-sm)',
					'md': 'var(--border-radius-md)',
					'lg': 'var(--border-radius-lg)',
					'full': 'var(--border-radius-full)'
				}
			},
		},
	plugins: [
        require('@tailwindcss/typography'),
	],
};
