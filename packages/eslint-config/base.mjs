import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended, // recommended lint rules for JavaScript
  eslintConfigPrettier, // Prevents ESLint from reporting style-related issues that Prettier handles.
  ...tseslint.configs.recommended, // recommended lint rules for TypeScript
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
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
      "@typescript-eslint/no-floating-promises": "error", // this rule requires parser from typescript-eslint. parser is defined in package level to comply with tsconfig
    },
  },
  // ignores needs to be in seperate object to work properly. see https://github.com/eslint/eslint/discussions/18304
  {
    ignores: ["**/*.config.ts", "dist/**/*", "**/*.js"],
  },
];
