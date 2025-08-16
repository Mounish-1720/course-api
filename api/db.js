import duckdb from 'duckdb';

// Create a connection to MotherDuck using your token
// Replace YOUR_TOKEN with your actual MotherDuck service token
const db = new duckdb.Database(
  'md:?motherduck_token=YOUR_TOKEN'
);

export function query(sql, params = []) {
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
