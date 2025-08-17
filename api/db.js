// api/db.js
import pkg from '@duckdb/duckdb-wasm';
const { AsyncDuckDB, NodeBundle } = pkg;

// Create Node-compatible bundle
const bundle = new NodeBundle();

// Single instance of DuckDB
const db = new AsyncDuckDB(bundle);

let connection;

async function getDB() {
  if (!connection) {
    await db.instantiate();
    connection = await db.connect();
  }
  return connection;
}

// Helper to run queries
export async function runQuery(sql, params = []) {
  const conn = await getDB();
  const result = await conn.query(sql, params);
  return result;
}
