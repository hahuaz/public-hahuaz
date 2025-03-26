import puppeteer from "puppeteer";

import type { ScrapeResult, Site } from "@/types/index.js";

export async function scrape(sites: Site[]) {
  const allScrapeResult: ScrapeResult = [];

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
  );

  for (const site of sites) {
    const urlsToScrape = site.resources.map(
      (resource) => `${site.domain}${resource}`
    );

    for (const url of urlsToScrape) {
      try {
        // console.log(`Scraping: ${url}`);
        await page.goto(url, { waitUntil: "networkidle2" });

        // Wait until the element has a non-empty text value
        await page.waitForFunction(
          (selector) => {
            const element = document.querySelector(selector);
            return element?.textContent?.trim() !== "";
          },
          {}, // Options
          site.querySelector
        );

        // await page.waitForSelector(querySelector);

        let scrapeValue = await page.evaluate((qs) => {
          const element = document.querySelector(qs);
          const textContent = element?.textContent?.trim();
          return textContent;
        }, site.querySelector);
        // console.log(`scrapeValue: ${scrapeValue}`);

        const resource = url.split("/").pop() as string;
        // console.log(`resource: ${resource}`);

        if (!scrapeValue) {
          throw new Error(`scrapeValue is ${scrapeValue} for ${url}`);
        }

        if (site.isLocalTr) {
          // In some locales (e.g., tr_TR), a comma is used as the decimal separator and a dot as the thousands separator (e.g., 1.234,56). Normalize the value.
          scrapeValue = scrapeValue.replace(/\./g, "").replace(",", ".");
        }

        allScrapeResult.push({
          resource,
          value: scrapeValue,
        });

        // await wait(5000);
      } catch (error) {
        console.error(`Error scraping ${url}:`, error);
      }
    }
  }

  await browser.close();

  return allScrapeResult;
}
