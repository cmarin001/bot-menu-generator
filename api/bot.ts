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
  console.log("📩 Incoming update:", JSON.stringify(req.body, null, 2));
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    res.status(200).end("ok");
  } else {
    res.status(200).json({ status: "Bot running" });
  }
}

bot.on("text", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  console.log("🔔 Received message:", text);

  if (text.startsWith("/start")) {
    return bot.sendMessage(chatId, "👋 Bienvenido! Usa /menu para generar tu menú del día.");
  }

  if (text.startsWith("/help")) {
    return bot.sendMessage(chatId, `ℹ️ Usa este formato:\n/menu\nSopa: Ajiaco\nPlato fuerte: ...`);
  }

  if (text.startsWith("/menu")) {
    const menuText = text.replace("/menu", "").trim();

    const parsedMenu = parseMenu(menuText);
    const html = generateHTML(parsedMenu);
    const imagePath = path.resolve("menu.png");

    try {
      await renderHTMLToImage(html, imagePath);
      await bot.sendPhoto(chatId, imagePath);
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error("❌ Error generating menu:", err);
      bot.sendMessage(chatId, "❌ Error generating menu.");
    }
  }
});

export default handler;