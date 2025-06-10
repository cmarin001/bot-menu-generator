import puppeteer from "puppeteer";
import fs from "fs";

export async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot();
  fs.writeFileSync(imagePath, buffer);
  await browser.close();
}
