import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({error: "Webhook not configured"});
  }

  const {command} = req.body;
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        embeds: [{
          title: "💀  Someone just nuked the portfolio!",
          color: 16711680,
          fields: [
            {name: "Command", value: `\`${command || "unknown"}\``, inline: true},
            {name: "Time", value: new Date().toLocaleString(), inline: true},
          ],
          footer: {text: "They cracked the password — respect."},
        }],
      }),
    });

    if (!response.ok) return res.status(502).json({error: "Discord failed"});
    return res.status(200).json({success: true});
  } catch {
    return res.status(500).json({error: "Internal server error"});
  }
}