import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";
import { parseMenu } from "../utils/parseMenu";
import { generateHTML } from "../utils/generateHTML";
import { renderHTMLToImage } from "../utils/renderImage";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
const bot = new TelegramBot(TELEGRAM_TOKEN, { webHook: {} });

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    res.status(200).end("ok");
  } else {
    res.status(200).json({ status: "Bot running" });
  }
}

bot.onText(/\/menu (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const menuText = match?.[1];

  const parsedMenu = parseMenu(menuText!);
  const html = generateHTML(parsedMenu);
  const imagePath = path.resolve("menu.png");

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
  bot.sendMessage(msg.chat.id, `ℹ️ Usa este formato:\n/menu\nSopa: Ajiaco\nPlato fuerte: ...`);
});

export default handler;