export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: (chunk) => (chunk ? `${chunk} - High Oleic Soy` : 'High Oleic Soy'),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  },

  publicRuntimeConfig: {
    idxUri: process.env.IDENTITY_X_URI || 'https://identity-x.parameter1.com/graphql',
    idxAppId: process.env.IDENTITY_X_APP_ID || '5fb2d401b8a845090ecc01d1',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/closeable.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/apollo',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://server.highsoy.com:53190/graphql',
      },
      identityX: '@/plugins/apollo/identity-x.js',
    },
  },
};
