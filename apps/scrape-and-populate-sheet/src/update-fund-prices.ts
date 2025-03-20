import { scrape, saveToSheet } from "@/lib/index.js";

import type { ScrapeResult } from "@/types/index.js";

const SITES_TO_SCRAPE = [
  {
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
  },
  {
    domain: "https://www.tradingview.com/",
    resources: ["symbols/BIST-ALTIN"],
    querySelector:
      "#js-category-content > div.tv-react-category-header > div.js-symbol-page-header-root > div > div > div > div.quotesRow-pAUXADuj > div:nth-child(1) > div > div.lastContainer-JWoJqCpY > span.last-JWoJqCpY.js-symbol-last > span",
  },
];

export async function updateFundPrices() {
  let allScrapeValues: ScrapeResult = [];

  for (const site of SITES_TO_SCRAPE) {
    const urlsToScrape = site.resources.map(
      (resource) => `${site.domain}${resource}`
    );
    const scrapeValues = await scrape({
      urlsToScrape,
      querySelector: site.querySelector,
      isLocalTr: site.isLocalTr,
    });

    allScrapeValues = allScrapeValues.concat(scrapeValues);
  }

  if (allScrapeValues.length > 0) {
    await saveToSheet(allScrapeValues);
  }

  console.log("updateFundPrices success.");
}
