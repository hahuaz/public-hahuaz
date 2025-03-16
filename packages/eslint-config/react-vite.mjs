import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import turboPlugin from "eslint-plugin-turbo";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * Eslint configuration for React projects using Vite.
 * It doesn't extend the base configuration because of parser and custom rule conflicts.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended, // recommended lint rules for JavaScript
  eslintConfigPrettier, // Prevents ESLint from reporting style-related issues that Prettier handles.
  ...tseslint.configs.recommended, // recommended lint rules for TypeScript
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // ignores needs to be in seperate object to work properly. see https://github.com/eslint/eslint/discussions/18304
  {
    ignores: ["**/*.config.ts", "dist/**/*", "**/*.js"],
  },
];
