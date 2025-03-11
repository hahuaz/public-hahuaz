import { config } from "@repo/eslint-config/base";
import tseslint from "typescript-eslint";

const customConfig = [
  ...config,
  {
    languageOptions: {
      // since parser is set to eslint parser:
      // 1. to comply with tsconfig, languageOptions should be declared in the package level.
      // 2. tsconfig and eslint works hand in hand. e.g. tsconfig should declare include for eslint to work
      // 3. typescript-eslint should be installed in the project.
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];

/** @type {import("eslint").Linter.Config} */
export default customConfig;
