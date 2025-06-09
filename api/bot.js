import { parseMenu } from "../utils/parseMenu.js";
import { generateHTML } from "../utils/generateHTML.js";
import { renderHTMLToImage } from "../utils/renderImage.js";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { webHook: { port: false } });

const __dirname = dirname(fileURLToPath(import.meta.url));
const TELEGRAM_URL = `https://api.telegram.org/bot${token}`;
const DEPLOY_URL = process.env.DEPLOY_URL;

bot.setWebHook(`${DEPLOY_URL}/api/bot`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    res.status(200).end("ok");
  } else {
    res.status(200).json({ status: "Bot running" });
  }
}

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
    console.error("Error:", err);
    bot.sendMessage(chatId, "❌ Error generating menu.");
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Bienvenido! Usa /menu para generar tu menú del día.`);
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `ℹ️ Usa este formato:\n/menu\\nSopa: Ajiaco\\nPlato fuerte: ...`);
});
