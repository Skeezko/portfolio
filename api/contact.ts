import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({error: "Webhook not configured"});
  }

  const {name, email, message} = req.body;
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        embeds: [{
          title: "📩  New Message!",
          color: 2588671,
          fields: [
            {name: "Name", value: name, inline: true},
            {name: "Email", value: email, inline: true},
            {name: "Message", value: message},
          ],
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!response.ok) {
      return res.status(502).json({error: "Discord webhook failed"});
    }

    return res.status(200).json({success: true});
  } catch (err) {
    return res.status(500).json({error: "Internal server error"});
  }
}