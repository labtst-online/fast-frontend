/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // light theme
          beige: {
            light: '#f5f5dc',
            DEFAULT: '#f5f5dc',
            dark: '#d8d8c0',
          },
          // dark theme
          dark: {
            bg: '#1a1a1a',
            'bg-secondary': '#2a2a2a',
            text: '#e0e0e0',
            'text-secondary': '#b0b0b0',
            border: '#444444',
            primary: '#5a8eff',
          }
        },
      },
    },
    plugins: [],
  }
