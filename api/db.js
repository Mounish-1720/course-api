// api/db.js
import { DuckDB } from 'duckdb-node-neo';

const db = new DuckDB({
  token: process.env.MD_TOKEN,
  database: process.env.MD_DATABASE || 'my_db', // use your env variable
});

// Export a helper function to run queries
export async function runQuery(sql) {
  try {
    const result = await db.query(sql);
    return result;
  } catch (err) {
    console.error('DB query failed:', err);
    throw err;
  }
}
