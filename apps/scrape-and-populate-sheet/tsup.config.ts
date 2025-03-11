import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  onSuccess: async () => {
    console.log("using config file onSuccess");
    const { exec } = await import("child_process");
    exec(
      "node --enable-source-maps --inspect dist/index.js",
      (err, stdout, stderr) => {
        if (err) {
          console.error("Error starting Node.js process:", err);
          return;
        }
        console.log(stdout);
        console.error(stderr);
      }
    );
    console.log("Node process started with --inspect");
  },
  entryPoints: ["src/index.ts"],
  clean: true,
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  ...options,
}));
