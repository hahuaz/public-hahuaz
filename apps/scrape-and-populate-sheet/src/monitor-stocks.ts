import cron from "node-cron";
import fs from "fs";

import { scrape, analyzeScrapedData } from "@/lib/index.js";

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

  cron.schedule(_every10Seconds, async () => {
    try {
      const scrapeResult = await scrape({
        urlsToScrape,
        querySelector: SCRAPE_CONFIG.querySelector,
      });
      // console.log("Scrape Result:", scrapeResult);

      const scrapedDataDirPath = `${process.cwd()}/scraped-data`;

      for (const { resource, value } of scrapeResult) {
        // console.log(`${resource}: ${value}`);

        if (!fs.existsSync(scrapedDataDirPath)) {
          fs.mkdirSync(scrapedDataDirPath);
        }

        fs.appendFileSync(`${scrapedDataDirPath}/${resource}`, `${value}\n`);
      }

      await analyzeScrapedData({
        scrapeResult,
        scrapedDataDirPath,
      });

      // console.log("monitorStocks cron job completed.");
    } catch (error) {
      console.error("Error in monitorStocks cron job:", error);
    }
  });
}
