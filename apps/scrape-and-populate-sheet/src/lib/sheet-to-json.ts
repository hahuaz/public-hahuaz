import * as XLSX from "xlsx";
import * as fs from "fs";

// Read file as a buffer
const fileBuffer = fs.readFileSync("./YKBNK (TRY).xlsx");

// Parse the workbook
const workbook = XLSX.read(fileBuffer, { type: "buffer" });

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

console.log("jsonData", jsonData);

// save as JSON file
const jsonFilePath = "./YKBNK (TRY).json";
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");
