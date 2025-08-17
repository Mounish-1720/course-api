// api/db.js
import { AsyncDuckDB } from '@duckdb/duckdb-wasm';

// Singleton DuckDB instance
let dbInstance;
let conn;

export async function getDB() {
  if (!dbInstance) {
    dbInstance = new AsyncDuckDB();
    await dbInstance.instantiate(); // empty in-memory DB
    conn = await dbInstance.connect();

    // Create courses table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER,
        name VARCHAR,
        type VARCHAR,
        price INTEGER
      )
    `);

    // Insert sample data
    await conn.query(`
      INSERT INTO courses VALUES
      (1, 'React', 'frontend', 200),
      (2, 'Angular', 'frontend', 180),
      (3, 'Node.js', 'backend', 300),
      (4, 'Express', 'backend', 250)
    `);
  }
  return conn;
}

export async function runQuery(sql) {
  const connection = await getDB();
  const result = await connection.query(sql); // query runs on the connection
  return result.toArray();
}
