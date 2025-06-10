import type { VercelRequest, VercelResponse } from "@vercel/node";
 async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Bot is healthy"
  });
}

export  default handler;