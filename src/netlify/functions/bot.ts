
import { Handler } from "@netlify/functions";
import { renderHTMLToImage } from "../../utils/renderImage";
import { parseMenu } from "../../utils/parseMenu";
import { generateHTML } from "../../utils/generateHTML";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

const handler: Handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");
    console.log("📩 Incoming update:", body);

    if (body.message?.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      console.log("🔔 Received message:", text);

      if (text.startsWith("/menu")) {
        const menuText = text.replace("/menu", "").trim();
        const parsedMenu = parseMenu(menuText);
        const html = generateHTML(parsedMenu);

        const imagePath = "/tmp/menu.png";
        await renderHTMLToImage(html, imagePath);
        await bot.sendPhoto(chatId, imagePath);
        fs.unlinkSync(imagePath);
      } else if (text.startsWith("/start")) {
        await bot.sendMessage(chatId, "👋 Bienvenido! Usa /menu para generar tu menú del día.");
      } else if (text.startsWith("/help")) {
        await bot.sendMessage(chatId, `ℹ️ Usa este formato:\n/menu\nSopa: Ajiaco\nPlato fuerte: ...`);
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