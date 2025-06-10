import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import fs from "fs";

export async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser with chrome-aws-lambda...");

  const executablePath =
    (await chromium.executablePath) ||
    "/usr/bin/google-chrome-stable";

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot();
  fs.writeFileSync(imagePath, buffer!);
  await browser.close();

  console.log("✅ Screenshot saved");
}
