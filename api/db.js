// api/db.js
import duckdb from "duckdb";

// Use MotherDuck connection string
const db = new duckdb.Database(`md:${process.env.MOTHERDUCK_DB}`);

// Helper to run queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export default { query };
