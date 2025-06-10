
import puppeteer, { executablePath } from "puppeteer";

const chromePath = puppeteer
  .executablePath()
  .replace('puppeteer-core', 'puppeteer');

async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser...");
  const browser = await puppeteer.launch({
    executablePath: chromePath, 
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
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