// api/courses.js
import db from "./db.js";

export default async function handler(req, res) {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Missing course type" });
    }

    const courses = await db.query(
      "SELECT id, name, price FROM main.courses WHERE type = ?",
      [type]
    );

    res.status(200).json({ courses });
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    res.status(500).json({
      error: "Failed to fetch courses",
      details: err.message,
    });
  }
}
