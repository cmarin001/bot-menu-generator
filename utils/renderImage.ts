
import puppeteer from "puppeteer";

export async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  console.log("🧪 Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
    console.log("🧪 Setting page content...");
  await page.setContent(html, { waitUntil: "networkidle0" });
  console.log("🧪 Taking screenshot...");
  await page.screenshot({ path: imagePath });
  console.log("✅ Screenshot saved:", imagePath);
  await browser.close();
}
