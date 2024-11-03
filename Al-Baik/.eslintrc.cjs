module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended", // Accessibility rules
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }], // Only warn for `console.log`, allow `warn` and `error`
    "react/display-name": "off", // Optional: suppress warnings for missing display names on components
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.spec.js"],
      env: {
        jest: true, // Jest globals for test files
      },
    },
  ],
};
