import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

console.log("🔎 Loaded puppeteer-core from:", require.resolve("puppeteer-core"));

async function renderHTMLToImage(html: string, imagePath: string): Promise<string> {
  try {
    console.log("🧪 Launching browser with chromium...");
    const executablePath = await chromium.executablePath();

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
