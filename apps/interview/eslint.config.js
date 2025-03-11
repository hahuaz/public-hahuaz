import { config } from "@repo/eslint-config/base";
import tseslint from "typescript-eslint";

const customConfig = [
  ...config,
  {
    languageOptions: {
      // since parser is set to eslint parser:
      // 1. languageOptions should be declared in package level because eslint should have reference to tsconfig to get included files
      // 2. typescript-eslint should be installed in the project.
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    ignores: ["react"],
  },
];

/** @type {import("eslint").Linter.Config} */
export default customConfig;
