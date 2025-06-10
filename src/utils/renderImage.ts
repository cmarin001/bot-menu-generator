import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { writeFile } from "fs/promises";
import path from "path";

export async function renderHTMLToImage(html: string, filename: string): Promise<string> {
  console.log("🧪 Launching browser...");

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = (await page.screenshot({ type: "png" })) as Buffer;
  const tmpDir = process.env.TMPDIR || "/tmp";
  const tmpPath = path.join(tmpDir, filename);
  await writeFile(tmpPath, buffer);

  await browser.close();

  console.log("✅ Screenshot saved at:", tmpPath);
  return tmpPath;
}
