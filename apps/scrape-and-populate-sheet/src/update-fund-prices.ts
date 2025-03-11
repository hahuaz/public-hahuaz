import { scrape, saveToSheet } from "@/lib/index.js";

const SCRAPE_CONFIG_X = {
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
  ],
  querySelector:
    "div.flex-shrink-0.relative span.inline-flex.items-center.tabular-nums",
};

const urlsToScrape = SCRAPE_CONFIG_X.resources.map(
  (resource) => `${SCRAPE_CONFIG_X.domain}${resource}`
);

export async function updateFundPrices() {
  const scrapeValues = await scrape({
    urlsToScrape,
    querySelector: SCRAPE_CONFIG_X.querySelector,
  });

  await saveToSheet(scrapeValues);
  console.log("updateFundPrices success.");
}
