import { Handler } from "@netlify/functions";
import { renderHTMLToImage } from "../../utils/renderImage";
import { parseMenu } from "../../utils/parseMenu";
import { generateHTML } from "../../utils/generateHTML";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    console.log("📩 Incoming update:", body);

    if (body.message?.text) {
      const chatId = body.message.chat.id;
      const text: string = body.message.text.trim();

      console.log("🔔 Received message:", text);

      if (text.startsWith("/menu")) {
        const menuText = text.replace("/menu", "").trim();
        const parsedMenu = parseMenu(menuText);
        const html = generateHTML(parsedMenu);

        const imagePath = await renderHTMLToImage(html, "menu.png");
        await bot.sendPhoto(chatId, imagePath);
        await fs.promises.unlink(imagePath);
      } else if (text.startsWith("/start")) {
        await bot.sendMessage(chatId, "👋 ¡Bienvenido! Usa /menu para generar tu menú del día.");
      } else if (text.startsWith("/help")) {
        await bot.sendMessage(
          chatId,
          "ℹ️ Usa este formato:\n/menu\nSopa: Ajiaco\nPlato fuerte: Arroz con pollo\nBebida: Limonada"
        );
      } else if (text.startsWith("/about")) {
        await bot.sendMessage(
          chatId,
          "🤖 Este bot convierte texto de menú en una imagen para que puedas compartirlo fácilmente. ¡Hecho con cariño!"
        );
      } else {
        await bot.sendMessage(chatId, "❓ Comando no reconocido. Usa /help para ver los comandos disponibles.");
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("❌ Error:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};

export { handler };
