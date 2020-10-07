const ui = require('@tailwindcss/ui');

module.exports = {
  plugins: [ui],
  theme: {
    extend: {
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
