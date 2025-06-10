import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

export async function renderHTMLToImage(html: string, fileName: string): Promise<string> {
  console.log("🧪 Launching browser with chrome-aws-lambda...");

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = await page.screenshot();

  // ✅ use Netlify's writable temp folder
  const imagePath = path.join("/tmp", fileName);
  fs.writeFileSync(imagePath, buffer!);

  await browser.close();

  console.log("✅ Screenshot saved at:", imagePath);

  return imagePath;
}
