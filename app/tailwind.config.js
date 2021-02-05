const ui = require('@tailwindcss/ui');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: [
    ui({ layout: 'sidebar' }),
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      fontFamily: {
        sans: ['Calibri', ...defaultTheme.fontFamily.sans],
        serif: ['Cambria', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // logo colors
        'logo-green': '#79863c',
        'logo-blue': '#253746',
        'logo-brown': '#6c571b',
        'logo-yellow': '#f2cd00',
        'logo-gold': '#c5a900',
        // primary accent colors
        'primary-1': '#342e1f',
        'primary-2': '#6c5a23',
        'primary-3': '#8b7a27',
        'primary-4': '#d1b400',
        'primary-5': '#ffdb00',
        // secondt accent colors
        'secondary-1': '#fce444',
        'secondary-2': '#3e3a35',
        'secondary-3': '#706359',
        'secondary-4': '#8f827a',

        'secondary-5': '#b6ada5',
        'secondary-5-50': '#faf9f9',
        'secondary-5-100': '#f8f7f6',
        'secondary-5-200': '#f0efed',
        'secondary-5-300': '#e9e6e4',
        'secondary-5-400': '#e2dedb',
        'secondary-5-500': '#dbd6d2',
      },
      boxShadow: {
        'outline-primary-3': '0 0 0 3px rgba(139, 122, 39, 0.5)',
        'outline-secondary-4': '0 0 0 3px rgba(143, 130, 122, 0.5)',
        'outline-secondary-5': '0 0 0 3px rgba(182, 173, 165, 0.5)',
      },
      width: {
        '300px': '300px',
        '250px': '250px',
      },
      animation: {
        'spin-fast': 'spin 500ms linear infinite',
      },
      backgroundOpacity: {
        65: '0.65',
        70: '0.70',
        80: '0.80',
        85: '0.85',
        90: '0.90',
      },
      fontSize: {
        xxs: '.5rem',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    textColor: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['disabled'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
