/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Indique onde os arquivos de origem do seu projeto estão localizados
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-safe-area')],
}
