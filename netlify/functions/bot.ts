import type { Handler } from "@netlify/functions";
import { bot } from "../../lib/bot";

export const handler: Handler = async (event: { body: any; }) => {
  try {
    const body = JSON.parse(event.body || "{}");
    bot.processUpdate(body);
    return { statusCode: 200, body: "ok" };
  } catch (error) {
    console.error("❌ Error:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
