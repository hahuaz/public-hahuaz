import puppeteer from "puppeteer";

import type { ScrapeResult } from "@/types/index.js";

export async function scrape({
  urlsToScrape,
  querySelector,
  USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  isLocalTr = false,
}: {
  urlsToScrape: string[];
  querySelector: string;
  USER_AGENT?: string;
  isLocalTr?: boolean;
}) {
  const scrapeResult: ScrapeResult = [];

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);

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
        querySelector
      );

      // await page.waitForSelector(querySelector);

      const scrapeValue = await page.evaluate((qs) => {
        const element = document.querySelector(qs);
        const textContent = element?.textContent?.trim();
        return textContent;
      }, querySelector);
      // console.log(`scrapeValue: ${scrapeValue}`);

      // append latest scraped value to the file as a new line
      const resource = url.split("/").pop() as string;
      // console.log(`resource: ${resource}`);

      if (scrapeValue === undefined) {
        console.error(`${url}: scrapeValue is undefined`);
        continue;
      }

      let normalizedScrapeValue = scrapeValue;
      if (isLocalTr) {
        // In some locales (e.g., tr_TR), a comma is used as the decimal separator and a dot as the thousands separator (e.g., 1.234,56). Normalize the value.
        normalizedScrapeValue = normalizedScrapeValue
          .replace(/\./g, "")
          .replace(",", ".");
      }

      scrapeResult.push({
        resource,
        value: normalizedScrapeValue,
      });

      // await wait(5000);
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  await browser.close();

  return scrapeResult;
}
