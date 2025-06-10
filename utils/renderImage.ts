import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import fs from "fs";

export async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser with chrome-aws-lambda...");

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: (await chromium.executablePath) || "/usr/bin/google-chrome-stable",
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot();

  console.log("📸 Screenshot captured, saving...");
  fs.writeFileSync(imagePath, buffer!);
  console.log("✅ Screenshot saved:", imagePath);

  await browser.close();
}
