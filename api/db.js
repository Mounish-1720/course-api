import duckdb from 'duckdb-async';

if (!process.env.MD_TOKEN) {
  throw new Error('MD_TOKEN missing! Set it in .env or Vercel Environment Variables');
}

console.log('MotherDuck token: Loaded ✅');

const db = new duckdb.Database(`md:?motherduck_token=${process.env.MD_TOKEN}`);

export async function runQuery(sql, params = []) {
  try {
    const result = await db.all(sql, params);
    return result;
  } catch (err) {
    console.error('DB Query Error:', err);
    throw err;
  }
}
