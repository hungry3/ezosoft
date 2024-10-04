/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#219EBC', 
        cyanDark : "#293950",
        navBlue:"#293950",
        lightBlue: "#BFE4FE",
        grey : "#293950",
        blue: "#006BC5",
        darkBlack: '#324560',
        darkGrey: '#58595B',
        navyblueLight: '#E7E8F1',
        green:'#1B7278',
        clay:'#F2E7E3',
        lightClay: '#CCCCCC',
      },
      fontWeight: {
        'expo-regular': '400',
        'expo-medium': '500',
        'expo-bold': '600',
      },
    },
  },
  plugins: [],
}

