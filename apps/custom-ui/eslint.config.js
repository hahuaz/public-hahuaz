import { config } from "@repo/eslint-config/react-vite";

const customConfig = [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];

/** @type {import("eslint").Linter.Config} */
export default customConfig;
