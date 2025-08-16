// db.js
import duckdb from "duckdb";

// Connect to MotherDuck using token
const db = new duckdb.Database(
  `md:?motherduck_token=${process.env.MD_TOKEN}`
);

// Wrap db.all in a promise so we can use async/await
export async function runQuery(sql, params = []) {
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
