// api/payments.js
import db from "./db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { courseId, userId, amount, status } = req.body;

      if (!courseId || !userId || !amount || !status) {
        return res.status(400).json({ error: "Missing payment fields" });
      }

      // Insert into payments table
      await db.query(
        `INSERT INTO payments (course_id, user_id, amount, status, created_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [courseId, userId, amount, status]
      );

      return res.status(201).json({ message: "Payment recorded successfully" });
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }

      const payments = await db.query(
        `SELECT id, course_id, amount, status, created_at 
         FROM payments 
         WHERE user_id = ? 
         ORDER BY created_at DESC`,
        [userId]
      );

      return res.status(200).json({ payments });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Failed to process payment:", err);
    res.status(500).json({
      error: "Failed to process payment",
      details: err.message,
    });
  }
}
