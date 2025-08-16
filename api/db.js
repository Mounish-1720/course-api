import fetch from "node-fetch";

const MD_TOKEN = process.env.MD_TOKEN;
const MD_DATABASE = process.env.MD_DATABASE;
const MD_SCHEMA = process.env.MD_SCHEMA;

export async function runQuery(sql) {
  const url = `https://cloud.motherduck.com/sql?database=${MD_DATABASE}&schema=${MD_SCHEMA}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MD_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`MotherDuck API error: ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.results || [];
}
