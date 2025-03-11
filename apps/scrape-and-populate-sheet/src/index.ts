// execute config to load environment variables
import "./config.js";

import { updateFundPrices } from "@/update-fund-prices.js";
import { monitorStocks } from "@/monitor-stocks.js";

import { select } from "@inquirer/prompts";

async function main() {
  const task = await select({
    message: "Select a task",
    choices: [
      { name: "Only update fund prices", value: "update" },
      {
        name: "Update fund prices and monitor stock",
        value: "update-and-monitor",
      },
    ],
  });

  if (task === "update") {
    await updateFundPrices();
  } else if (task === "update-and-monitor") {
    await updateFundPrices();
    await monitorStocks();
  } else {
    console.error("Invalid task");
  }
}

await main();
