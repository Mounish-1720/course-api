// api/db.js
import { AsyncDuckDB } from '@duckdb/duckdb-wasm';

// Singleton DuckDB instance
let dbInstance;

export async function getDB() {
  if (!dbInstance) {
    dbInstance = new AsyncDuckDB();
    await dbInstance.instantiate(); // Empty DB in memory

    // Optional: create a courses table for demo/testing
    await dbInstance.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER,
        name VARCHAR,
        type VARCHAR,
        price INTEGER
      )
    `);

    // Optional: insert sample data
    await dbInstance.query(`
      INSERT INTO courses VALUES
      (1, 'React', 'frontend', 200),
      (2, 'Angular', 'frontend', 180),
      (3, 'Node.js', 'backend', 300),
      (4, 'Express', 'backend', 250)
    `);
  }
  return dbInstance;
}

export async function runQuery(sql) {
  const db = await getDB();
  const result = await db.query(sql);
  return result.toArray();
}
