import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts", // where to output generated schema
  out: "./src/database/drizzle",          // where to store migration files
  dialect: "postgresql",              // PostgreSQL driver
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ['public'], // only include specific schemas
} satisfies Config;
