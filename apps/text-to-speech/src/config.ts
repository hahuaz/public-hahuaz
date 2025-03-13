import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Check if any of the required environment variables are missing
const { AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, NODE_ENV } = process.env;

if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION || !NODE_ENV) {
  console.error({
    message: "Missing required environment variables",
    env: {
      NODE_ENV,
      AZURE_SPEECH_KEY,
      AZURE_SPEECH_REGION,
    },
  });
  throw new Error();
}

export const APP_CONFIG: {
  NODE_ENV: string;
  AZURE_SPEECH_KEY: string;
  AZURE_SPEECH_REGION: string;
} = {
  NODE_ENV: process.env.NODE_ENV!,
  AZURE_SPEECH_KEY,
  AZURE_SPEECH_REGION,
};

console.log("APP_CONFIG:", APP_CONFIG);
