export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: '#006BC5', 
        cyanDark : "#293950",
        navBlue:"#293950",
        lightBlue: "#BFE4FE",
        grey : "#293950",
        blue: "#006BC5",
        darkBlack: '#324560',
        darkGrey: '#58595B',
        navyblueLight: '#E7E8F1',
      },
      lineHeight: {
        '70': '70px', 
        '24':'24px'
      },
     

      backgroundImage: {
        'gradient': 'linear-gradient(264.34deg, #01519A 30.04%, #006BC5 93.73%)',
      },
      boxShadow: {
        'custom': '0px 5px 35px 5px #00000026',
        'custom2': '10px 5px 10px 10px 4px #00000026',
        'custom3': ' 0px 3px 15px 0px #0000001A' ,
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
