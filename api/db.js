import duckdb from 'duckdb';

// Initialize the DuckDB connection to MotherDuck
// Store token in env variable: process.env.MD_TOKEN
const db = new duckdb.Database(
  `md:?motherduck_token=${process.env.MD_TOKEN}`
);

// Wrap db.all into a Promise so we can use async/await
export function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("DB Query Error:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
