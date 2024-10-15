//@type {import('tailwindcss').Config}
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      borders: {
        select: '#5a9fe2',
        exclusive: '#f5955b',
        deluxe: '#009587',
        premium: '#d1548d',
        ultra: '#fad663',
      },
      colors: {
        select: '#5a9fe2',
        exclusive: '#f5955b',
        deluxe: '#009587',
        premium: '#d1548d',
        ultra: '#fad663',
      },
      backgroundImage: {
        'default-bg': "url('resources/src/defaultbg.png')",
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ],
}
