
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../lib/bot";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("📩 Incoming update:", JSON.stringify(req.body, null, 2));
  if (req.method === "POST") {
    bot.processUpdate(req.body);
    res.status(200).end("ok");
  } else {
    res.status(200).json({ status: "Bot running" });
  }
}
