// api/db.js
import { AsyncDuckDB, NodeBundle } from '@duckdb/duckdb-wasm';

// Create Node-compatible bundle
const bundle = new NodeBundle();

// Single instance of DuckDB
const db = new AsyncDuckDB(bundle);

let connection;

async function getDB() {
  if (!connection) {
    // Instantiate and connect
    await db.instantiate();
    connection = await db.connect();

    // Example: load your courses table here if needed
    // await connection.query(`
    //   CREATE TABLE IF NOT EXISTS courses (id INTEGER, name VARCHAR, type VARCHAR, price INTEGER)
    // `);
  }
  return connection;
}

// Helper to run queries
export async function runQuery(sql, params = []) {
  const conn = await getDB();
  const result = await conn.query(sql, params);
  return result;
}
