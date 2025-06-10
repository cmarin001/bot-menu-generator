import puppeteer from "puppeteer";

async function renderHTMLToImage(html: string, outputPath: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.setViewport({ width: 800, height: 600 });
  await page.screenshot({ path: outputPath });
  await browser.close();
}

export { renderHTMLToImage };