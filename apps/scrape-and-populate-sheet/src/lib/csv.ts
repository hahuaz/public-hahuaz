import * as fs from "fs";
import * as path from "path";

/**
 * Reverses the rows of a CSV file (excluding the header) and writes the output to a new file.
 * @param inputPath - Path to the input CSV file.
 * @param outputPath - Path to the output (reversed) CSV file.
 */
export function reverseCsvFile(inputPath: string, outputPath: string): void {
  const absoluteInputPath = path.resolve(inputPath);
  const absoluteOutputPath = path.resolve(outputPath);

  fs.readFile(absoluteInputPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const lines = data.trim().split("\n");
    if (lines.length <= 1) {
      console.log("Not enough data to reverse.");
      return;
    }

    const header = lines[0];
    const rows = lines.slice(1).reverse();

    const output = [header, ...rows].join("\n");

    fs.writeFile(absoluteOutputPath, output, (err) => {
      if (err) {
        console.error("Error writing reversed CSV:", err);
      } else {
        console.log("Reversed CSV written to", absoluteOutputPath);
      }
    });
  });
}

reverseCsvFile("./m2.csv", "./m2-reversed.csv");
