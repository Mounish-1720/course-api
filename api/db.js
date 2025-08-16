// db.js
import duckdb from "duckdb";

// Must use your MD token from env vars
const db = new duckdb.Database(`md:?motherduck_token=${process.env.MD_TOKEN}`);

// Create a connection (sync)
const connection = db.connect();

export function runQuery(sql, params = []) {
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
