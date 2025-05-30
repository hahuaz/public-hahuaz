import cron from "node-cron";

import { select } from "@inquirer/prompts";

// execute config to load environment variables
import "./config.js";

import { updateSheet, scrape, monitor } from "@/lib/index.js";

import type { Site } from "@/types/index.js";

const _cronEvery10Seconds = "*/10 * * * * *";
const _cronEveryMinute = "*/1 * * * *";
const _cronEvery5Minutes = "*/5 * * * *";

const TR_FUNDS: Site = {
  domain: "https://fintables.com/",
  resources: [
    "fonlar/ZBJ",
    "fonlar/PPN",
    "fonlar/BGP",
    "fonlar/DBB",
    "fonlar/GA1",
    "fonlar/GYK",
    "fonlar/GUB",
    "fonlar/TI6",
    "fonlar/MUT",
    "fonlar/HMG",
    "fonlar/OBI",
    "fonlar/APT",
    "fonlar/NRG",
    "fonlar/FIT",
    "fonlar/TP2",
  ],
  querySelector:
    "div.flex-shrink-0.relative span.inline-flex.items-center.tabular-nums",
  isLocalTr: true,
};

const FOREIGN_RESERVES: Site = {
  domain: "https://www.tradingview.com/",
  resources: ["symbols/BIST-ALTIN", "symbols/USDTRY", "symbols/GOLD"],
  querySelector:
    "#js-category-content > div.tv-react-category-header > div.js-symbol-page-header-root > div > div > div > div.quotesRow-iJMmXWiA > div:nth-child(1) > div > div.lastContainer-zoF9r75I > span.last-zoF9r75I.js-symbol-last",
};

const TR_STOCKS: Site = {
  domain: "https://fintables.com/",
  resources: ["endeksler/XUTUM", "sirketler/BANVT"],
  querySelector:
    "div.flex-shrink-0.relative span.inline-flex.items-center.tabular-nums",
};

async function main() {
  const task = await select({
    message: "Select a task",
    choices: [
      { name: "Update all prices", value: "update-all" },
      {
        name: "Monitor foreign reserves",
        value: "monitor-foreign-reserves",
      },
      {
        name: "Monitor pre-determined stocks",
        value: "monitor-stocks",
      },
    ],
  });

  if (task === "update-all") {
    const scrapeResult = await scrape([TR_FUNDS, FOREIGN_RESERVES]);
    console.log("scrapeResult", scrapeResult);

    await updateSheet(scrapeResult);

    console.log("Updated all prices successfully.");
  } else if (task === "monitor-foreign-reserves") {
    cron.schedule(_cronEveryMinute, async () => {
      const scrapeResult = await scrape([FOREIGN_RESERVES]);
      await updateSheet(scrapeResult);

      await monitor({
        scrapeResult,
      });

      console.log("cron job cycle completed.");
    });
  } else if (task === "monitor-stocks") {
    cron.schedule(_cronEvery10Seconds, async () => {
      const scrapeResult = await scrape([TR_STOCKS]);
      await updateSheet(scrapeResult);

      await monitor({
        scrapeResult,
        importantResources: ["XUTUM"],
      });

      console.log("cron job cycle completed.");
    });
  } else {
    console.error("Invalid task");
  }
}

await main();
