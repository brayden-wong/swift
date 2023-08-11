import { Config } from "drizzle-kit";
import { config } from "dotenv";
config({
  path: `.env`,
});

const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl=true&options=project%3D${process.env.ENDPOINT_ID}`;

export default {
  schema: "./libs/common/src/schemas",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  out: "./.drizzle",
} satisfies Config;
