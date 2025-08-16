import { runQuery } from "./db.js";

export default async function handler(req, res) {
  try {
    const { type } = req.query;

    let sql = `SELECT id, name, price FROM ${process.env.MD_SCHEMA}.courses`;
    if (type) {
      sql += ` WHERE type = '${type}'`;  // parameterized not needed for simple API call
    }

    const courses = await runQuery(sql);
    res.status(200).json({ courses });
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    res.status(500).json({
      error: "Failed to fetch courses",
      details: err.message,
    });
  }
}
