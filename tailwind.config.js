/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'krona': ['Krona One', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
      },
      colors: {
        'asciende-purple': '#514163',
        'asciende-yellow': '#fdda36',
      },
    },
  },
  plugins: [],
};
