import type { VercelRequest, VercelResponse } from "@vercel/node";
import TelegramBot from "node-telegram-bot-api";

 async function handler(req: VercelRequest, res: VercelResponse) {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
  const DEPLOY_URL = process.env.DEPLOY_URL!;
  const bot = new TelegramBot(TELEGRAM_TOKEN);

  try {
    const response = await bot.setWebHook(`${DEPLOY_URL}/api/bot`);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export default handler;