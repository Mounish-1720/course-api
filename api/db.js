<<<<<<< HEAD
// api/db.js
import duckdb from "duckdb";

// Create a DuckDB connection in memory
const db = new duckdb.Database(":memory:");

// Attach to MotherDuck using your token (from Vercel env)
db.run(
  `ATTACH 'md:?motherduck_token=${process.env.MOTHERDUCK_TOKEN}' AS md`
);

// Select your MotherDuck database (from Vercel env)
if (process.env.MOTHERDUCK_DB) {
  db.run(`USE md.${process.env.MOTHERDUCK_DB}`);
}

// Helper to run queries safely
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
=======
import { createClient } from '@motherduck/motherduck-js';

const client = createClient({
  token: process.env.MOTHERDUCK_TOKEN,   // Vercel env
  database: process.env.MOTHERDUCK_DB,   // Vercel env
});

export default client;
>>>>>>> 2629c2e (first commit)
