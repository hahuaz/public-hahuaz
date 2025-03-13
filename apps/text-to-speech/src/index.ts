import path from "path";

// execute config to load environment variables
import "./config.js";
import { useAzure } from "./lib/azure.js";

await useAzure({
  textPath: path.join(process.cwd(), "text.txt"),
  outputFile: path.join(process.cwd(), "output", "my-audio"),
});
