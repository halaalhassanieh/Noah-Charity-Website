 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
       backgroundImage: {
        'hero': "url('/assets/hero.jpg')"
      },
      borderWidth: {
        1: "1px",
      },
     
      colors: {
        "red-wine": "#7B000B",
        "white/60": "#ffffff99",
        "black/60": "#00000099",
        "gray/600": "#6C757D",
        "gray/100": "#F8F9FA",
      },
      textShadow: {
        black:" 3px 3px 8px rgba(0, 0, 0, 0.85)",
      },
      screens: {

        // Desktop Screen :
        "custom-3xl": "1920px",
        // Laptop Screen :
        "custom-2xl": "1440px",
        //largeScreen
        "custom-xl": "1068px",
        //Tap Screen :
        "custom-tap":"768px",
        // Mobile Screen :
        "custom-mobile": "390px",
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', "sans-serif"],
      },
      boxShadow: {
        custom: "0px 1px 0px 1px #7B000B",
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    function ({ addComponents }) {
      addComponents({
        // Add custom-container Class :
        ".custom-container": {
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "10px",
          paddingRight: "10px",
          "@media (min-width: 390px)": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
          "@media (min-width: 640px)": {
            paddingLeft: "25px",
            paddingRight: "25px",
          },
          "@media (min-width: 768px)": {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          "@media (min-width: 1068px)": {
            paddingLeft: "56px",
            paddingRight: "56px",
          },
          "@media (min-width: 1440px)": {
            paddingLeft: "72px",
            paddingRight: "72px",
          },
          "@media (min-width: 1920px)": {
            paddingLeft: "0",
            paddingRight: "0",
            maxWidth: "1597px",
          },
        },
      });
    },
  ],
};
