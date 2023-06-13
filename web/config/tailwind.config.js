/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '350px',
        'xs-plus': '400px',
        'lg-plus': '1152px',
      },
      ringWidth: ['hover', 'active'],
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
