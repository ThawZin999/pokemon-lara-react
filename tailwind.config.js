/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./node_modules/flowbite/**/*.{js,jsx}",
    "node_modules/flowbite-react/lib/esm/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
