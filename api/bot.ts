import type { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../lib/bot";

export async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("📩 Incoming update:", JSON.stringify(req.body, null, 2));

    if (req.method === "POST") {
      await bot.processUpdate(req.body);
      return res.status(200).end("ok");
    }

    // Respond with a default status for non-POST requests
    res.status(200).json({
      message: "Telegram bot endpoint. Send a POST request from Telegram."
    });
  } catch (error) {
    console.error("❌ Serverless error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handler as default };
