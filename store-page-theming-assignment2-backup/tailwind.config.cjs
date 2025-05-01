/* Tailwind CSS configuration */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './src/assets/styles/components/**/*.css',
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary)',
          'primary-deep': 'var(--primary-deep)',
          'primary-mild': 'var(--primary-mild)',
          'primary-subtle': '#e0f2fe',
          secondary: 'var(--secondary)',
          background: 'var(--background)',
          text: 'var(--text)',
          error: '#ef4444',
          'error-subtle': '#fee2e2',
        },
        ringWidth: {
          1: '1px',
        },
      },
    },
    plugins: [],
  };