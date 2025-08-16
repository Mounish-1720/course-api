import db from './db';

export default async function handler(req, res) {
  const { type } = req.query;

  if (!type || (type !== 'frontend' && type !== 'backend')) {
    return res.status(400).json({ error: 'Invalid course type' });
  }

  try {
    const result = await db.query(`
      SELECT id, name, price
      FROM courses
      WHERE type='${type}'
    `);

    res.status(200).json(result);
  } catch (err) {
    console.error('DB query error:', err);
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
}
