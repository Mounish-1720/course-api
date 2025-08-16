import db from "./db.js";

export default async function handler(req, res) {
  try {


    const { type } = req.query; // frontend / backend / etc.

    // ✅ Query courses table
   const result = await db.query(
  "SELECT id, name, price FROM courses WHERE type = ?",
  [type]
);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses", details: error.message });
  }
}
