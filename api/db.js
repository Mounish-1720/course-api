// api/db.js
import { AsyncDuckDB } from '@duckdb/duckdb-wasm';
import * as Node from '@duckdb/duckdb-wasm/dist/node';

// Node-compatible bundle (no Web Worker needed)
const bundle = new Node.AsyncNodeBundle();

let dbInstance;
let conn;

export async function getDB() {
  if (!dbInstance) {
    // Create DuckDB instance
    dbInstance = new AsyncDuckDB(bundle);
    await dbInstance.instantiate();

    // Connect to the database
    conn = await dbInstance.connect();

    // Create table if it doesn't exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER,
        name VARCHAR,
        type VARCHAR,
        price INTEGER
      )
    `);

    // Optional: insert sample data (skip if your DB already has data)
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

// Run a query
export async function runQuery(sql) {
  const connection = await getDB();
  const result = await connection.query(sql);
  return result.toArray();
}
