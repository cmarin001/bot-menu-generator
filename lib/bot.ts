import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";
import { parseMenu } from "../utils/parseMenu";
import { generateHTML } from "../utils/generateHTML";
import { renderHTMLToImage } from "../utils/renderImage";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: false });

bot.on("text", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  console.log("🔔 Received message:", text);

  if (text.startsWith("/start")) {
    return bot.sendMessage(chatId, "👋 Bienvenido! Usa /menu para generar tu menú del día.");
  }

  if (text.startsWith("/help")) {
    return bot.sendMessage(
      chatId,
      `ℹ️ Usa este formato:\n/menu\nSopa: Ajiaco\nPlato fuerte: Arroz con pollo\nBebida: Limonada`
    );
  }

  if (text.startsWith("/menu")) {
    const menuText = text.replace("/menu", "").trim();
    const parsedMenu = parseMenu(menuText);
    const html = generateHTML(parsedMenu);
    const filename = "menu.png";
    const imagePath = path.join("/opt/buildhome/tmp", filename);

    try {
      await renderHTMLToImage(html, filename);
      await bot.sendPhoto(chatId, imagePath);
      console.log("✅ Sent photo to user:", chatId);
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error("❌ Error generating menu:", err);
      bot.sendMessage(chatId, "❌ Error generating menu.");
    }
  }
});

export { bot };
