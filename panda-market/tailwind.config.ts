// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Next.js App Router 폴더
    './components/**/*.{js,ts,jsx,tsx}', // 컴포넌트 폴더
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
