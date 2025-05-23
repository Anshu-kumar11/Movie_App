/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        "dark-subtle": "rgba(255,255,255,0.5)",
        "light-subtle": "rgba(39,39,39,0.5)",
      },
    },
  },
  plugins: [],
};
