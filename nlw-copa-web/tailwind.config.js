/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      backgroundImage: {
        main: 'url(/assets/bg-effects.png)'
      },
      colors: {
        success: {
          500: '#129E57'
        },
        waring: {
          500: '#F7DD43',
          700: '#FFBB00'
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        }
      }
    }
  },
  plugins: []
};
