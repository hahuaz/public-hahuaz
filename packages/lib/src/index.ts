import fs from "fs";
import readline from "readline";

export function isEqualArrays<T>(
  arr1: T[] | undefined | null,
  arr2: T[] | undefined | null
): boolean {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  return arr1.every((val, idx) => val === arr2[idx]);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get the latest appended lines from a file.
 * The returned array will contain the latest lines first.
 */
export async function getLastLines(
  filePath: string,
  numLines: number
): Promise<string[]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileSize = fs.statSync(filePath).size;

  // Create a read stream to read the file's content
  const stream = fs.createReadStream(filePath, {
    encoding: "utf-8",
    // The start is the byte position to start reading from. This is useful when dealing with large files where we only need the latest entries. Adjust as needed.
    start: Math.max(0, fileSize - 1024 * 3),
  });

  // Create a readline interface to process the file stream line by line
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  const lines = [];

  for await (const line of rl) {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      lines.push(trimmedLine);
    }
  }

  // reverse the array to get the latest lines first
  const reversedLines = lines.reverse();

  // get the wanted number of lines
  return reversedLines.slice(0, numLines);
}

/**
 * Asserts that two values are equal.
 */
export function assertEqual(actual: any, expected: any, testName: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(`${testName} failed: expected ${e}, got ${a}`);
  }
  console.log(`${testName} passed`);
}
