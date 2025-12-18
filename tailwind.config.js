// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",  // <-- ADD THIS LINE
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         marquee: {
//           "0%": { transform: "translateX(0%)" },
//           "100%": { transform: "translateX(-50%)" },
//         },
//         "marquee-reverse": {
//           "0%": { transform: "translateX(-50%)" },
//           "100%": { transform: "translateX(0%)" },
//         },
//       },
//       animation: {
//         marquee: "marquee var(--duration, 30s) linear infinite",
//         "marquee-reverse": "marquee-reverse var(--duration, 30s) linear infinite",
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
