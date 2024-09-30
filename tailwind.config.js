const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'ejemplo': {
            50: '#fdf8f6',
            100: '#f2e8e5',
            200: '#eaddd7',
            300: '#e0cec7',
            400: '#d2bab0',
            500: '#bfa094',
            600: '#a18072',
            700: '#977669',
            800: '#846358',
            900: '#43302b',
          }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: {
            DEFAULT: '#F5FAF8', // Primary background
            100: '#EDF3F4', // Primary background hover
            200: '#D1E5EB' // Secondary background
          },
          primary: {
            DEFAULT: '#86ADB3' // Primary color
          },
          secondary: {
            DEFAULT: '#CECFA3', // Secondary color
            100: '#A4B471' // Secondary color hover
          },
          content1: {
            DEFAULT: "#222526" //Primary text
          },
          content2: {
            DEFAULT: "#3D4345" //Secondary text
          },
          success: {
            DEFAULT: '#A8CFAA'
          },
          warning: {
            DEFAULT: '#F6D365'
          },
          danger: {
            DEFAULT: '#E57373'
          }
        }
      },

      dark: {
        colors: {
          background: {
            DEFAULT: '#1C1F24', // Primary background
            100: '#1F2329', // Primary background hover
            200: '#2A3C44' // Secondary background
          },
          primary: {
            DEFAULT: '#86ADB3' // Primary color
          },
          secondary: {
            DEFAULT: '#B5C28A', // Secondary color
            100: '#A4B471' // Secondary color hover
          },
          content1: {
            DEFAULT: "#F0F0E1" //Primary text
          },
          content2: {
            DEFAULT: "#D1D1C9", //Secondary text
            100: '#EFEFDF'
          },
          success: {
            DEFAULT: '#4A7F50'
          },
          warning: {
            DEFAULT: '#D4A23D'
          },
          danger: {
            DEFAULT: '#C85C5C'
          }
        }
      }
    }
  })],
};
