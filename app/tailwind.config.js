const ui = require('@tailwindcss/ui');
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme');

const urwDinSemiCon = {
  fontFamily: 'urw-din-semi-condensed',
};

module.exports = {
  plugins: [
    ui({ layout: 'sidebar' }),
    plugin(({ addBase }) => {
      addBase({
        h1: {
          ...urwDinSemiCon,
          fontSize: '48px',
        },
        h2: {
          ...urwDinSemiCon,
          fontSize: '36px',
        },
        h3: {
          ...urwDinSemiCon,
          fontSize: '24px',
        },
        p: { fontSize: '16px', fontWeight: 'initial' },
      });
    }),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.text-shadow-dark': {
          'text-shadow': '3px 3px 6px #342e1f',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      fontFamily: {
        sans: ['urw-din-regular', ...defaultTheme.fontFamily.sans],
        serif: ['Cambria', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // logo colors
        'logo-green': '#79863c',
        'logo-blue': '#213748',
        'logo-brown': '#705705',
        'logo-yellow': '#F8CD00',
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
      backgroundImage: {
        'home-banner': "url('https://img.highoilsoy.com/home-banner.jpg')",
        'knowledge-banner': "url('https://img.highoilsoy.com/knowledge-banner.jpg')",
        'why-banner': "url('https://img.highoilsoy.com/why-banner.jpg')",
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
