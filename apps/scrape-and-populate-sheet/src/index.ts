// execute config to load environment variables
import "./config.js";
import { scrape, saveToSheet } from "@/lib/index.js";

const SCRAPE_CONFIG = {
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

const urlsToScrape = SCRAPE_CONFIG.resources.map(
  (resource) => `${SCRAPE_CONFIG.domain}${resource}`
);

const scrapeValues = await scrape({
  urlsToScrape,
  querySelector: SCRAPE_CONFIG.querySelector,
});

await saveToSheet(scrapeValues);
