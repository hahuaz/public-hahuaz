import path from "path";
import fs from "fs";
import readline from "readline";

import playSound from "play-sound";

const workingDir = process.cwd();
let IS_XTUM_INCREASING = false;

type Prices = number[];

function isPriceIncreasing(prices: Prices, resource: string) {
  if (!prices || prices.length < 60) return false;

  // if 0th price is greater than the previous 59th price consider it as increasing
  const isIncreasing = prices[0] > prices[59];

  if (isIncreasing) {
    if (resource === "endeksler/XUTUM") {
      IS_XTUM_INCREASING = isIncreasing;
      return true;
    }

    return true;
  } else {
    return false;
  }
}

/**
 * Get the latest appended lines from a file
 */
async function getLastLines(
  filePath: string,
  numLines: number
): Promise<Prices> {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return [];
  }

  const fileSize = fs.statSync(filePath).size;

  const stream = fs.createReadStream(filePath, {
    encoding: "utf-8",
    // start is the byte position to start reading from. if you want to get the latest span of lines, it should be closest to the file size
    start: Math.max(0, fileSize - 1024 / 4), // Read only the last .25KB (adjust as needed)
  });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  const lines = [];

  for await (const line of rl) {
    if (line.trim()) {
      lines.push(parseFloat(line.trim()));
    }
  }

  // reverse the array to get the latest prices first
  const reversedLines = lines.reverse();

  // get the wanted number of lines
  return reversedLines.slice(0, numLines);
}

function triggerAlarm() {
  const player = playSound();

  const soundPath = path.join(workingDir, "notification.mp3");

  player.play(soundPath, (err) => {
    if (err) console.error("Error playing sound:", err);
  });
}

/**
 * Monitor the prices of the resources and trigger an alarm if the price is increasing
 */
export async function monitorPrices({
  URLS_TO_SCRAPE,
}: {
  URLS_TO_SCRAPE: string[];
}) {
  for (const url of URLS_TO_SCRAPE) {
    const resource = url.split("/").pop();
    if (!resource) {
      throw new Error(`Resource not found in URL: ${url}`);
    }

    const filePath = `data/${resource}`;

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }

    const prices = await getLastLines(filePath, 60);
    // console.log(prices);

    if (isPriceIncreasing(prices, resource)) {
      if (IS_XTUM_INCREASING) {
        console.log(`${resource} price is increasing.`);
        triggerAlarm();
      }
    }
  }
}
