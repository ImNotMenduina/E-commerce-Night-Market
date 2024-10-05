//@type {import('tailwindcss').Config}
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
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
