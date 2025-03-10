import puppeteer from "puppeteer";

import type { ScrapeResult } from "@/types/index.js";

export async function scrape({
  urlsToScrape,
  querySelector,
  USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
}: {
  urlsToScrape: string[];
  querySelector: string;
  USER_AGENT?: string;
}) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);

  const scrapeValues: ScrapeResult = [];

  for (const url of urlsToScrape) {
    try {
      // console.log(`Scraping: ${url}`);
      await page.goto(url);
      await page.waitForSelector(querySelector);

      const scrapeValue = await page.evaluate((qs) => {
        const element = document.querySelector(qs);
        const textContent = element?.textContent?.trim();
        return textContent;
      }, querySelector);

      // append latest scraped value to the file as a new line
      const resource = url.split("/").pop() as string;

      if (scrapeValue === undefined) {
        console.error(`${url}: scrapeValue is undefined`);
        continue;
      }

      // In some locales (e.g., tr_TR), a comma is used as the decimal separator and a dot as the thousands separator (e.g., 1.234,56). Normalize the value.
      const formattedScrapeValue = scrapeValue
        .replace(/\./g, "")
        .replace(",", ".");

      scrapeValues.push({
        resource,
        value: formattedScrapeValue,
      });

      // await wait(5000);
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  await browser.close();

  return scrapeValues;
}
