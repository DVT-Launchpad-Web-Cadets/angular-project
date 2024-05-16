/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "32px",
    },
    colors: {
      "dark-blue": "#006D77",
      "light-blue": "#83C5BE",
      coral: "#E29578",
      cream: "#EDF6F9",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#E0DEDE",
      "dark-gray": "#A5A5A5",
      "dark-bg": "#212121",
      "dark-bg-2": "#393939",
    },
    extend: {},
  },
};
