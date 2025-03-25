import { select } from "@inquirer/prompts";

// execute config to load environment variables
import "./config.js";

import { saveToSheet, scrape } from "@/lib/index.js";
import { monitorStocks } from "@/monitor-stocks.js";
import { monitor } from "@/monitor.js";

import type { Site } from "@/types/index.js";

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
    "#js-category-content > div.tv-react-category-header > div.js-symbol-page-header-root > div > div > div > div.quotesRow-pAUXADuj > div:nth-child(1) > div > div.lastContainer-JWoJqCpY > span.last-JWoJqCpY.js-symbol-last",
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

    await saveToSheet(scrapeResult);

    console.log("Updated all prices successfully.");
  } else if (task === "monitor-foreign-reserves") {
    await monitor([FOREIGN_RESERVES]);
  } else if (task === "monitor-stocks") {
    await monitorStocks();
  } else {
    console.error("Invalid task");
  }
}

await main();
