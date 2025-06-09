require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { parseMenu } = require("./utils/parseMenu");
const { generateHTML } = require("./utils/generateHTML");
const { renderHTMLToImage } = require("./utils/renderImage");
const path = require("path");
const fs = require("fs");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/menu (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const menuText = match[1];

  const parsedMenu = parseMenu(menuText);
  const html = generateHTML(parsedMenu);
  const imagePath = path.join(__dirname, "menu.png");

  try {
    await renderHTMLToImage(html, imagePath);
    await bot.sendPhoto(chatId, imagePath);
    fs.unlinkSync(imagePath);
  } catch (err) {
    console.error("Error generating or sending image:", err);
    bot.sendMessage(chatId, "Sorry, there was an error generating the menu.");
  }
});
