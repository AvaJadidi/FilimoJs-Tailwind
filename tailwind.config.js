/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './index.html',
    './src/**/*.js',
  ],

  theme: {
    extend: {
      backgroundImage:{
        'hero': "url('/src/image/minion_desktop_1_v1.jpeg')",
      },
      fontFamily:{
        sans:["IranSans"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
