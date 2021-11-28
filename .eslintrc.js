module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'vuejs-accessibility',
  ],
  extends: [
    'plugin:vue/essential',
    'plugin:vuejs-accessibility/recommended',
    '@vue/airbnb',
  ],
  rules: {},
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
