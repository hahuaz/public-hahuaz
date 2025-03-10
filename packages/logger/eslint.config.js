import { config } from "@repo/eslint-config/base";

const customConfig = [
  ...config,
  {
    // allow type `any` usage
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

/** @type {import("eslint").Linter.Config} */
export default customConfig;
