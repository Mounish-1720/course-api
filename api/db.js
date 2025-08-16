// api/db.js
import duckdb from "duckdb";

if (!process.env.MOTHERDUCK_TOKEN || !process.env.MOTHERDUCK_DB) {
  throw new Error("Missing MOTHERDUCK_TOKEN or MOTHERDUCK_DB in env");
}

// Create in-memory DuckDB instance
const db = new duckdb.Database(":memory:");

// Attach to MotherDuck using token
db.run(
  `ATTACH 'md:${process.env.MOTHERDUCK_DB}?motherduck_token=${process.env.MOTHERDUCK_TOKEN}' AS md`
);

// Use the attached DB
db.run(`USE md`);

// Query helper
function query(sql, params = []) {
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

export default { query };
