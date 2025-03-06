import { config } from "@repo/eslint-config/base";

const customConfig = [
  ...config,
  // {
  //   rules: {
  //     "no-console": ["error", { allow: ["warn", "error"] }],
  //   },
  // },
];

/** @type {import("eslint").Linter.Config} */
export default customConfig;
