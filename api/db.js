import duckdb from "duckdb";

let db = null;

export function getDB() {
  if (!db) {
    db = new duckdb.Database(":memory:"); // for testing
    // If using MotherDuck, connect with token:
    // db = new duckdb.Database("md:?motherduck_token=YOUR_TOKEN");
  }
  return db;
}
