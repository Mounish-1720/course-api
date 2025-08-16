// api/db.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const MD_TOKEN = process.env.MD_TOKEN; // Your MotherDuck token
const MD_DATABASE = process.env.MD_DATABASE || 'my_db';

export async function runQuery(sql) {
  const url = `https://cloud.motherduck.com/sql`; // MotherDuck HTTP endpoint
  const body = { database: MD_DATABASE, query: sql };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MD_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return data;
}
