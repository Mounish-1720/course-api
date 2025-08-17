// api/db.js
import fetch from 'node-fetch';

const MOTHERDUCK_TOKEN = process.env.MD_TOKEN;
const MOTHERDUCK_API_URL = 'https://sql.motherduck.com/api/v1/query';

// Helper to run queries using the MotherDuck HTTP API
export async function runQuery(sql, params = []) {
  try {
    // Prepare the SQL statement with parameters
    // Note: MotherDuck's HTTP API uses an object for parameters,
    // with keys matching placeholders like $1, $2 etc.
    // The code below handles a simple array for convenience.
    const queryBody = {
      query: sql,
      parameters: params
    };

    const response = await fetch(MOTHERDUCK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MOTHERDUCK_TOKEN}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MotherDuck API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // The MotherDuck API returns a specific JSON structure.
    // We extract the rows to match the original function's output.
    return data[0].data; // Assuming the first result set
  } catch (error) {
    console.error('Failed to run MotherDuck HTTP query:', error);
    throw new Error('Database query failed via HTTP API');
  }
}