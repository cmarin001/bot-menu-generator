import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { writeFile } from "fs/promises";
import path from "path";

export async function renderHTMLToImage(html: string, filename: string): Promise<string> {
  try {
    console.log("🧪 Launching browser...");

    const executablePath = await chromium.executablePath || "/usr/bin/chromium-browser";
    console.log("📍 Executable path:", executablePath);

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = await page.screenshot({ type: "png" });
    const tmpPath = path.join(process.env.TMPDIR || "/tmp", filename);
    await writeFile(tmpPath, buffer as Buffer);

    await browser.close();
    console.log("✅ Screenshot saved at:", tmpPath);
    return tmpPath;
  } catch (err) {
    console.error("❌ renderHTMLToImage error:", err);
    throw err;
  }
}
