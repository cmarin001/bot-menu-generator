import puppeteer from "puppeteer";
import { writeFile } from "fs/promises";
import path from "path";

export async function renderHTMLToImage(html: string, filename: string): Promise<string> {
  try {
    console.log("🧪 Launching browser...");

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = (await page.screenshot({ type: "png" })) as Buffer;
    const tmpPath = path.join(process.env.TMPDIR || "/tmp", filename);
    await writeFile(tmpPath, buffer);

    await browser.close();

    console.log("✅ Screenshot saved at:", tmpPath);
    return tmpPath;
  } catch (error) {
    console.error("❌ renderHTMLToImage error:", error);
    throw error;
  }
}
