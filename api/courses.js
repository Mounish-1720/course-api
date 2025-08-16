import db from "./db.js";

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    const rows = await db.query(
      "SELECT id, name, price FROM main.courses WHERE type = ?",
      [type]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses", details: err.message });
  }
}
