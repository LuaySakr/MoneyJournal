module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React 19 JSX transform doesn't require React in scope
    'react/react-in-jsx-scope': 'off',
    // TypeScript handles prop types
    'react/prop-types': 'off',
    // Enforce consistent imports
    '@typescript-eslint/consistent-type-imports': 'warn',
    // Disallow unused variables (use _ prefix to ignore)
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
    // React Native specific
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
  ],
};