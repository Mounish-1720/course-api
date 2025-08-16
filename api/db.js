import duckdb from "duckdb";

// Ensure token is set
if (!process.env.MD_TOKEN) {
  throw new Error("MD_TOKEN missing! Set it in .env or Vercel Environment Variables");
}

console.log("MotherDuck token: Loaded ✅");

// Connect to MotherDuck cloud database
// Do NOT call db.connect() for MotherDuck
const db = new duckdb.Database(`md:?motherduck_token=${process.env.MD_TOKEN}`);

// Promise wrapper for queries
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
