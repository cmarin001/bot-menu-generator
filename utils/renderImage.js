const puppeteer = require("puppeteer");

async function renderHTMLToImage(html, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.setViewport({ width: 800, height: 600 });
  await page.screenshot({ path: outputPath });
  await browser.close();
}

module.exports = { renderHTMLToImage };
