export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ?id=' });
  }

  const token = process.env.DISCORD_BOT_TOKEN;

  try {
    const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch user',
        details: await response.text()
      });
    }

    const user = await response.json();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
