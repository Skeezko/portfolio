import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({error: "Webhook not configured"});
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        embeds: [{
          title: "📥  CV Downloaded!",
          color: 4237585,
          fields: [
            {name: "File", value: "`Hesham_CHAUDHRY_cv.pdf`", inline: true},
            {name: "Time", value: new Date().toLocaleString(), inline: true},
          ],
          footer: {text: "Potential recruiter alert?"},
        }],
      }),
    });

    if (!response.ok) return res.status(502).json({error: "Discord failed"});
    return res.status(200).json({success: true});
  } catch {
    return res.status(500).json({error: "Internal server error"});
  }
}