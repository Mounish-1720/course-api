// api/db.js
import duckdb from "duckdb";

const db = new duckdb.Database(":memory:");

db.run(
  `ATTACH 'md:?motherduck_token=${process.env.MOTHERDUCK_TOKEN}' AS md`
);

if (process.env.MOTHERDUCK_DB) {
  db.run(`USE md.${process.env.MOTHERDUCK_DB}`);
}

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export default { query };
