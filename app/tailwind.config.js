const ui = require('@tailwindcss/ui');

module.exports = {
  plugins: [ui],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
