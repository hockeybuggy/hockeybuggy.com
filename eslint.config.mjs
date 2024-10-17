import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      // "plugin:react/recommended",
      // "plugin:react-hooks/recommended",
      "next",
      "plugin:@typescript-eslint/recommended",
      // "plugin:jsx-a11y/recommended",
      "prettier"
    )
  ),
  {
    plugins: {
      "jsx-a11y": fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "no-extra-semi": "off",
      "sort-keys": "off",
      // "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
];
