/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#5D87DB',
          500: '#4679D8',
          600: '#3468C0',
          700: '#2A56A0',
        },
        teal: {
          400: '#4CDCE8',
          500: '#2DCDDF',
          600: '#27B9CA',
          700: '#1F95A3',
        },
        yellow: {
          400: '#F7BC85',
          500: '#F5A962',
          600: '#F29640',
          700: '#E47B1F',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};