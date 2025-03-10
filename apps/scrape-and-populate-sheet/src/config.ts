import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Check if any of the required environment variables are missing
const { GOOGLE_SHEET_ID, NODE_ENV } = process.env;

if (!GOOGLE_SHEET_ID) {
  console.error({
    message: "Missing required environment variables",
    env: {
      NODE_ENV,
      GOOGLE_SHEET_ID,
    },
  });
  throw new Error();
}

export const APP_CONFIG: {
  MODE: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_CREDENTIAL_PATH: string;
} = {
  MODE: process.env.NODE_ENV!,
  GOOGLE_SHEET_ID,
  GOOGLE_CREDENTIAL_PATH: path.join(process.cwd(), "/credentials/google.json"),
};

console.log("APP_CONFIG:", APP_CONFIG);
