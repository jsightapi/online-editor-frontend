module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      display: 'IBM Plex Sans, sans-serif',
    },
    extend: {
      colors: {
        green: '#79B400',
        red: '#B33939',
        dark: {
          alpha: '#676669',
          beta: '#39373A',
          gama: '#AAB0B7',
          delta: '#F0F0F0',
        },
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
