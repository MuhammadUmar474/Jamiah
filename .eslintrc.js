module.exports = {
  env: {browser: true, es2021: true, node: true, jest: true},
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    strict: ['error', 'never'],
    'no-console': 'warn',
    'react/prop-types': 'warn',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
