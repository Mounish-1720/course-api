// api/courses.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { type } = req.query;

  if (!type || (type !== 'frontend' && type !== 'backend')) {
    return res.status(400).json({ error: 'Invalid course type' });
  }

  try {
    const response = await fetch(`https://cloud.motherduck.com/sql?db=${process.env.MOTHERDUCK_DB}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MOTHERDUCK_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: `SELECT id, name, price FROM courses WHERE type='${type}'` })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error("MotherDuck HTTP query error:", err);
    res.status(500).json({ error: "Failed to fetch courses", details: err.message });
  }
}
