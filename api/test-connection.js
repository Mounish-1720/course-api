import { runQuery } from './db.js';
import 'dotenv/config';
async function testConnection() {
  try {
    const result = await runQuery('SELECT current_database(), current_schema()');
    console.log('Connection Test Result:', result);
  } catch (err) {
    console.error('Connection Test Failed:', err);
  }
}

testConnection();
