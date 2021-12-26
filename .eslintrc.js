module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["jsx-a11y"],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "no-extra-semi": "off",
    "sort-keys": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    // `next/link` `Link`s don't have `href`s on the `a` tags.
    "jsx-a11y/anchor-is-valid": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
