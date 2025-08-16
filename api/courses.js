import { getDB } from "./db.js";

export default async function handler(req, res) {
  const db = getDB();

  if (req.method === "GET") {
    db.all("SELECT * FROM courses", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json(rows);
    });
  } else if (req.method === "POST") {
    const { name, price } = req.body;
    db.run("INSERT INTO courses (name, price) VALUES (?, ?)", [name, price], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({ message: "Course added successfully" });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
