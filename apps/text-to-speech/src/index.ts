import path from "path";

import "./config.js";
import { useGoogleTTS } from "./lib/index.js";

const inputFile = path.join(process.cwd(), "text.txt");
const outputFile = path.join(process.cwd(), "output", "0tts");

await useGoogleTTS({
  inputFile,
  outputFile,
});
