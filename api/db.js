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


db.run("USE md;", (err) => {
  if (err) {
    console.error("Failed to switch schema:", err);
  } else {
    console.log("✅ Connected to MotherDuck and using schema md");
  }
});


db.all("SHOW TABLES;", (err, rows) => {
  if (err) {
    console.error("Error fetching tables:", err);
  } else {
    console.log("📋 Available tables:", rows);
  }
});


// Query helper (uses prepared statements)
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(sql);
      stmt.all(params, (err, rows) => {
        stmt.finalize();
        if (err) {
          console.error("DB Query Error:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } catch (err) {
      console.error("DB Prepare Error:", err);
      reject(err);
    }
  });
}

export default { query };
