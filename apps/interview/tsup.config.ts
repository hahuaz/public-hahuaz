import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["index.ts"],
  clean: true,
  format: ["esm"],
  splitting: true,
  ...options,
}));
