import path from "path";
import fs from "fs";

import playSound from "play-sound";

import { getLastLines } from "@repo/lib";

import type { ScrapeResult } from "@/types/index.js";

type Prices = number[];

function isPriceIncreasing(prices: Prices) {
  if (!prices || prices.length < 60) {
    console.log("Not enough prices to compare.", prices.length);
    return false;
  }

  // if 0th price is greater than the previous 59th price consider it as increasing
  // console.log({
  //   prices0: prices[0],
  //   prices59: prices[59],
  // });
  const isIncreasing = prices[0] > prices[59];

  if (isIncreasing) {
    return true;
  } else {
    return false;
  }
}

function triggerAlarm() {
  const player = playSound();

  const soundPath = path.join(process.cwd(), "notification.mp3");

  player.play(soundPath, (err) => {
    if (err) console.error("Error playing sound:", err);
  });
}

/**
 * Monitor the prices of the resources and trigger an alarm if the price is increasing
 */
export async function analyzeScrapedData({
  scrapeResult,
  scrapedDataDirPath,
}: {
  scrapeResult: ScrapeResult;
  scrapedDataDirPath: string;
}) {
  let IS_XTUM_INCREASING = false;

  for (const scrapeItem of scrapeResult) {
    const { resource } = scrapeItem;

    const filePath = `${scrapedDataDirPath}/${resource}`;

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      throw new Error(`File not found: ${filePath}`);
    }

    const prices = await getLastLines(filePath, 60);

    const parsedPrices = prices.map((price) => parseFloat(price));

    const res = isPriceIncreasing(parsedPrices);

    if (resource === "XUTUM") {
      IS_XTUM_INCREASING = res;
    } else {
      if (IS_XTUM_INCREASING && res) {
        console.log(`${resource} price is increasing.`);
        triggerAlarm();
      }
    }
  }
}
