// api/db.js
import fetch from "node-fetch";

const MOTHERDUCK_TOKEN = process.env.MOTHERDUCK_TOKEN;
const MOTHERDUCK_DB = process.env.MOTHERDUCK_DB;

if (!MOTHERDUCK_TOKEN || !MOTHERDUCK_DB) {
  throw new Error("Environment variables MOTHERDUCK_TOKEN or MOTHERDUCK_DB are missing.");
}

async function query(sql) {
  const response = await fetch(`https://cloud.motherduck.com/sql?db=${MOTHERDUCK_DB}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MOTHERDUCK_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`MotherDuck query failed: ${text}`);
  }

  return response.json();
}

export default { query };
