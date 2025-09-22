/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#006341',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

