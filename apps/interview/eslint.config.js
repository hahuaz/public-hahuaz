import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
const customConfig = [
  ...config,
  // {
  //   rules: {
  //     "no-console": ["error", { allow: ["warn", "error"] }],
  //   },
  // },
  {
    ignores: ["react"],
  },
];

export default customConfig;
