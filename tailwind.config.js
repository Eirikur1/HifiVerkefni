/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "rubik-vinyl": ["Rubik Vinyl", "cursive"],
        "rubik-scribble": ["Rubik Scribble", "cursive"],
        "roboto-mono": ["Roboto Mono", "monospace"],
      },
      maxWidth: {
        1440: "1440px",
      },
      colors: {
        "brand-blue": "#2686ca",
      },
    },
  },
  plugins: [],
};

