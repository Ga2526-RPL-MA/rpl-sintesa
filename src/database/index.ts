import 'dotenv/config';

import * as schema from './drizzle/schema'
import * as relations from './drizzle/relations'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString!, { prepare: false });
export const db = drizzle(client, { schema: {...schema, ...relations } });
