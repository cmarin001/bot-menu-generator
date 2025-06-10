
import puppeteer from "puppeteer";

async function renderHTMLToImage(html: string, imagePath: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.screenshot({ path: imagePath });
  await browser.close();
}

export { renderHTMLToImage };