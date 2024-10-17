import eslint from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      jest: jestPlugin,
      "jsx-ally": jestPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      "no-extra-semi": "off",
      "sort-keys": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
  {
    // enable jest rules on test files
    files: ["e2e_tests/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
  {
    // enable jest rules on test files
    files: ["prebuild_tests/**"],
    ...jestPlugin.configs["flat/recommended"],
  }
);
