
import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';

async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser...");
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath, 
    headless: chromium.headless,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport
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