import cron from "node-cron";
import fs from "fs";

import { scrape, analyzeScrapedData, saveToSheet } from "@/lib/index.js";

import type { Site, ScrapeResult } from "@/types/index.js";

export async function monitor(sitesToMonitor: Site[]) {
  const _every10Seconds = "*/10 * * * * *";
  const _everyMinute = "*/1 * * * *";
  const _every5Minutes = "*/5 * * * *";

  cron.schedule(_every5Minutes, async () => {
    try {
      let scrapeResult: ScrapeResult = [];

      for (const site of sitesToMonitor) {
        const urlsToScrape = site.resources.map(
          (resource) => `${site.domain}${resource}`
        );
        const scrapeValues = await scrape({
          urlsToScrape,
          querySelector: site.querySelector,
          isLocalTr: site.isLocalTr,
        });

        scrapeResult = scrapeResult.concat(scrapeValues);
      }
      console.log("Scrape Result:", scrapeResult);

      if (scrapeResult.length > 0) {
        await saveToSheet(scrapeResult);
      }

      const scrapedDataDirPath = `${process.cwd()}/scraped-data`;

      for (const scrapeItem of scrapeResult) {
        // console.log(`${resource}: ${value}`);

        if (!fs.existsSync(scrapedDataDirPath)) {
          fs.mkdirSync(scrapedDataDirPath);
        }

        fs.appendFileSync(
          `${scrapedDataDirPath}/${scrapeItem.resource}`,
          `${scrapeItem.value}\n`
        );

        await analyzeScrapedData({
          scrapeItem,
          scrapedDataDirPath,
          isXtumImportant: false,
        });
      }

      console.log("cron job cycle completed.");
    } catch (error) {
      console.error("Error in monitorStocks cron job:", error);
    }
  });
}
