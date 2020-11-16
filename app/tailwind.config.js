const ui = require('@tailwindcss/ui');

module.exports = {
  plugins: [ui],
  theme: {
    extend: {
      colors: {
        'black-2c': '#342E1F',
      },
      width: {
        '300px': '300px',
        '250px': '250px',
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
