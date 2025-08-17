// api/courses.js
import { runQuery } from './db.js';

export default async function handler(req, res) {
  try {
    const { type } = req.query;

    let sql = 'SELECT id, name, price FROM main.courses';
    const params = [];

    if (type) {
      // Correct placeholder for MotherDuck's HTTP API
      sql += ' WHERE type = $1'; 
      params.push(type);
    }

    const courses = await runQuery(sql, params);

    res.status(200).json({ courses });
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    res.status(500).json({
      error: 'Failed to fetch courses',
      details: err.message,
    });
  }
}