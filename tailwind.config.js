/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //網站自訂主色調,下面數字仿製tailwindcss深淺自訂
      colors: {
        gold: {
          50: '#fffaf0',
          100: '#f8ebc8',
          200: '#f1d999',
          300: '#e8c46f',
          400: '#D6B46A',
          500: '#c9a04d',
          600: '#a98335',
          700: '#866626',
          800: '#5e4819',
          900: '#3a2c0f',
        },

        black: {
          DEFAULT: '#080808',
          soft: '#121212',
        },

        warm: {
          white: '#F8F5EF',
        },

        grayText: '#A7A7A7',
      },

      fontFamily: {
        display: ['"Playfair Display"', '"Noto Serif TC"', 'serif'],
        body: ['Inter', '"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
