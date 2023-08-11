import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { Logger } from "@nestjs/common";

import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config({
  path: `.env`,
});
const logger = new Logger("Migration");

const main = async () => {
  logger.log("Starting Migration");
  const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl=true&options=project%3D${process.env.ENDPOINT_ID}`;

  if (!connectionString) throw new Error("DATABASE_URL is required");

  const sql = neon(connectionString);

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./.drizzle" });
};

main()
  .catch((error) => logger.error(error))
  .then(() => logger.log("Migration Complete"))
  .finally(() => process.exit(0));
