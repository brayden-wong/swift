/** @type import("tailwindcss").Config */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
