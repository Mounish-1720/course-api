// db.js
import duckdb from "duckdb";

// Connect to MotherDuck using token (set in Vercel env vars)
const db = new duckdb.Database(
  `md:?motherduck_token=${process.env.MD_TOKEN}`
);

// Open a connection
const connection = db.connect();

// Promise wrapper for queries
export async function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.all(sql, params, (err, rows) => {
      if (err) {
        console.error("DB Query Error:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
