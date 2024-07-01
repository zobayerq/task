/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1fb6ff',
        'custom-bg': '#fa5911',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('daisyui'),
  ],
}
