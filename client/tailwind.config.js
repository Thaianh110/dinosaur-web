/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      width: {
        main: '1200px'
      },
      backgroundColor: {
        main: '#090917',
        overlay: 'rgba(0,0,0,0.6)'
      },
      colors: {
        primary: '#854CE6',
        text1: '#F2F3F4',
        // text1: '#cccccc',
        text2: '#b1b2b3',
        card_light: ' #191924'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(20px);',
            transform: 'translateY(20px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': 'translateY(8px);',
            transform: 'translateY(8px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0.5);',
            transform: 'scale(0.5);'
          },
          '100%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top-sm 0.2s linear both;',
        'scale-up-center':'scale-up-center 0.15s cubic-bezier(0.390,0.575,0.565,1.000) both;'
      }
    },
    screens: {
      md: { max: '960px' }, // Chuyển md sang max-width
      sm: { max: '640px' }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')({ strategy: 'class' })]
}
