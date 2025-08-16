// api/courses.js
import db from "./db.js";

export default async function handler(req, res) {
  try {
    const { type } = req.query;

    let sql = "SELECT id, name, price FROM my_db.main.courses";
    let params = [];

    if (type) {
      sql += " WHERE type = ?";
      params.push(type);
    }


    
    const courses = await db.query(sql, params);
    res.status(200).json({ courses });
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    res.status(500).json({
      error: "Failed to fetch courses",
      details: err.message,
    });
  }
}
