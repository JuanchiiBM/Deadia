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
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: {
            DEFAULT: '#fafafa', // Primary background
            100: '#f4f4f5', // Primary background hover
            200: '#fff', // Secondary background
            300: '#C0D8DF', // Secondary background hover
            400: '#fbfbfb', // Primary background contrast
          },
          primary: {
            DEFAULT: '#86ADB3', // Primary color
            50: '#f3f8f8',
            100: '#e1ebec',
            200: '#c6d9db',
            300: '#86adb3',
            400: '#6f9aa1',
            500: '#547e86',
            600: '#486972',
            700: '#3f575f',
            800: '#394b51',
            900: '#334146',
            950: '#1f292d'
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
            DEFAULT: '#0e0e11', // Primary background
            100: '#090909', // Primary background hover
            200: '#18181b', // Secondary background
            300: '#1a1a1e', // Secondary background hover
            400: '#0e0e11', // Primary background contrast
          },
          primary: {
            DEFAULT: '#86ADB3', // Primary color
            50: '#f3f8f8',
            100: '#e1ebec',
            200: '#c6d9db',
            300: '#86adb3',
            400: '#6f9aa1',
            500: '#547e86',
            600: '#486972',
            700: '#3f575f',
            800: '#394b51',
            900: '#334146',
            950: '#1f292d'
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
            DEFAULT: '#C88500'
          },
          danger: {
            DEFAULT: '#C85C5C'
          }
        }
      }
    }
  })],
};
