/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./src/**/*.{js,jsx,ts,tsx}"  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'left': '4px 0px 8px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

