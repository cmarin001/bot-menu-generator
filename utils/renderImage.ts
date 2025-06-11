import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import fs from "fs/promises";

console.log("🔎 Loaded puppeteer-core from:", require.resolve("puppeteer-core"));

async function renderHTMLToImage(html: string, imagePath: string): Promise<string> {
  try {
    console.log("🧪 Launching browser with chromium...");

    let executablePath = await chromium.executablePath();
    console.log("🧪 Launching browser with executablePath... ",executablePath);
    if (!executablePath || executablePath === "/opt/buildhome/tmp/chromium") {
      executablePath = "/var/task/node_modules/@sparticuz/chromium/bin/chromium";
    }
    console.log("🧪 try executablePath... ",executablePath);
    try {
      await fs.access(executablePath);
    } catch {
      throw new Error(
        `Chromium binary not found at ${executablePath}. Make sure it's included via netlify.toml's included_files.`
      );
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless === true,
    });

    const page = await browser.newPage();
    console.log("🧪 Setting page content...");
    await page.setContent(html, { waitUntil: "networkidle0" });

    console.log("🧪 Taking screenshot...");
    await page.screenshot({ path: imagePath });

    await browser.close();
    console.log("✅ Screenshot saved:", imagePath);
    return imagePath;
  } catch (error) {
    console.error("❌ renderHTMLToImage error:", error);
    throw error;
  }
}

export { renderHTMLToImage };
