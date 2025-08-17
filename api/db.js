// api/db.js
import fetch from 'node-fetch';

const MD_TOKEN = process.env.MD_TOKEN;
const MOTHERDUCK_API_URL = 'https://sql.motherduck.com/api/v1/query';

// Helper to run queries using the MotherDuck HTTP API
export async function runQuery(sql, params = []) {
  try {
    console.log("Attempting to connect to MotherDuck API..."); // Debug log

    const queryBody = {
      query: sql,
      parameters: params
    };

    const response = await fetch(MOTHERDUCK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MD_TOKEN}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryBody)
    });

    console.log(`Received response status: ${response.status}`); // Debug log
    console.log(`Received response status text: ${response.statusText}`); // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MotherDuck API full error response:', errorText); // Full error body
      throw new Error(`MotherDuck API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return data[0].data;
  } catch (error) {
    console.error('Failed to run MotherDuck HTTP query:', error);
    throw new Error('Database query failed via HTTP API');
  }
}