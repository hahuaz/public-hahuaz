import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  onSuccess: async () => {
    console.log("Custom onSuccess hook");
  },
  entryPoints: ["index.ts"],
  clean: true,
  format: ["esm"],
  splitting: true,
  ...options,
}));
