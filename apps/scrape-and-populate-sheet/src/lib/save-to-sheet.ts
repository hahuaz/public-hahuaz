import google from "@googleapis/sheets";

import type { ScrapeResult } from "@/types/index.js";
import { APP_CONFIG } from "@/config.js";

const { GOOGLE_SHEET_ID, GOOGLE_CREDENTIAL_PATH } = APP_CONFIG;

export async function saveToSheet(scrapeResult: ScrapeResult) {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_CREDENTIAL_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const sheetName = "scraped-prices";

  try {
    // 1. Read Column A (Resources)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetName}!A:A`, // Read all of column A
    });

    const rows = response.data.values ? response.data.values.flat() : [];
    // console.log("Sheet Rows (Column A):", rows);

    if (!rows.length) {
      throw new Error("No data found in Column A.");
    }

    // 2. Map resource names to row indexes (row numbers)
    const resourceToRowMapping: Record<string, number> = {};
    rows.forEach((resource, index) => {
      resourceToRowMapping[resource] = index + 1; // Google Sheets uses 1-based index
    });
    // console.log("Resource Row Mapping:", resourceToRowMapping);

    // 3. Prepare update requests for the correct rows
    const updateRequests = scrapeResult
      .map(({ resource, value }) => {
        const rowIndex = resourceToRowMapping[resource];
        if (!rowIndex) {
          console.warn(`Resource ${resource} not found. Skipping.`);
          return null; // Make sure to handle this case.
        }

        return {
          range: `${sheetName}!B${rowIndex}`, // Write to column B of the correct row
          values: [[value]],
        };
      })
      .filter((request) => request !== null); // remove null update requests

    if (updateRequests.length === 0) {
      console.warn("No valid updates found.");
      return;
    }

    console.log("Update Requests:", JSON.stringify(updateRequests));

    // 4. Perform batch update
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: GOOGLE_SHEET_ID,
      requestBody: {
        data: updateRequests,
        valueInputOption: "RAW",
      },
    });
  } catch (error) {
    console.error("Error updating sheet:", error);
  }
}
