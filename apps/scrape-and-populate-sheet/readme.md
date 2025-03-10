
## Installing Chrome (for Puppeteer)

After installing the dependencies, you need to install Chrome for Puppeteer to function properly:

```bash
npx puppeteer browsers install chrome
```

## Prerequisites for Using the Google Sheets API

1. **Create a Service Account**: 
   - Set up a service account and download the credentials JSON file (e.g., `credentials.json`).
   
2. **Enable the Google Sheets API**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Navigate to **API & Services** > **Library**.
   - Search for "Google Sheets API" and enable it.

3. **Share Your Google Sheet**:
   - Share the Google Sheet you want to manipulate with the service account’s email address. You can find the email address in the `credentials.json` file.
