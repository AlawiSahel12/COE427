// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb', // Base style guide
    'plugin:react/recommended', // React specific linting rules
    'plugin:react-hooks/recommended', // Enforces the Rules of Hooks
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enables JSX parsing
    },
    ecmaVersion: 'latest', // Allows for parsing modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['react', 'prettier'], // Additional ESLint plugins
  rules: {
    'prettier/prettier': 'error', // Shows Prettier errors as ESLint errors
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allows JSX in .js and .jsx files
    'react/react-in-jsx-scope': 'off', // Not required with React 17+
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript or other methods
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/test.js', '**/setupTests.js'] },
    ],
    'no-console': 'warn', // Warn on console.log usage
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables except those starting with _
    'jsx-a11y/anchor-is-valid': 'off', // Disable specific accessibility rule
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
