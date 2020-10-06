module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {},
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [
  //         ['@', '.'],
  //       ],
  //       extensions: ['.vue', '.js'],
  //     },
  //   },
  // },
};
