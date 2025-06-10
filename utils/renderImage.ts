
import chromium from 'chrome-aws-lambda';
import puppeteer from "puppeteer-core";

console.log("🔎 Loaded puppeteer-core from:", require.resolve("puppeteer-core"));
async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser with chrome-aws-lambda...");
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });

  const page = await browser.newPage();
  console.log("🧪 Setting page content...");
  await page.setContent(html, { waitUntil: "networkidle0" });
  console.log("🧪 Taking screenshot...");
  await page.screenshot({ path: imagePath });
  console.log("✅ Screenshot saved:", imagePath);
  await browser.close();
}

export { renderHTMLToImage };