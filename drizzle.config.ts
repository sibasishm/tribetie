import { defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
});
