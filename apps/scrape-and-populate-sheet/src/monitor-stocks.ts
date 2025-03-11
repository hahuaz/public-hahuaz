import cron from "node-cron";
import fs from "fs";

import { scrape, monitorPrices } from "@/lib/index.js";

const SCRAPE_CONFIG = {
  domain: "https://fintables.com/",
  resources: ["endeksler/XUTUM", "sirketler/BANVT"],
  querySelector:
    "div.flex-shrink-0.relative span.inline-flex.items-center.tabular-nums",
};

const urlsToScrape = SCRAPE_CONFIG.resources.map(
  (resource) => `${SCRAPE_CONFIG.domain}${resource}`
);

export async function monitorStocks() {
  const _every10Seconds = "*/10 * * * * *";
  const _everyMinute = "*/1 * * * *";

  cron.schedule(_everyMinute, async () => {
    const scrapeResult = await scrape({
      urlsToScrape,
      querySelector: SCRAPE_CONFIG.querySelector,
    });
    // console.log("Scrape Result:", scrapeResult);

    for (const { resource, value } of scrapeResult) {
      console.log(`${resource}: ${value}`);

      const scrapedDataDirPath = `${process.cwd()}/scraped-data`;

      if (!fs.existsSync(scrapedDataDirPath)) {
        fs.mkdirSync(scrapedDataDirPath);
      }

      fs.appendFileSync(`${scrapedDataDirPath}/${resource}`, `${value}\n`);
    }

    await monitorPrices({
      urlsToScrape,
    });

    console.log("monitorStocks cron job completed.");
  });
}
