// api/db.js
import { createClient } from '@motherduck/motherduck-js';

const client = createClient({
  token: process.env.MOTHERDUCK_TOKEN,
  database: process.env.MOTHERDUCK_DB,
});

export default client;
