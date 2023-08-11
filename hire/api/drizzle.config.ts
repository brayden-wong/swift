import { Config } from "drizzle-kit";
import { config } from "dotenv";
config({
  path: `.env`,
});

console.log(process.env.DATABASE_URL);
export default {
  schema: "./libs/common/src/schemas",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  out: "./.drizzle",
} satisfies Config;
