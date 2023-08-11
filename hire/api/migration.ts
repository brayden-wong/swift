import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon, neonConfig } from "@neondatabase/serverless";
import { Logger } from "@nestjs/common";

import * as dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const logger = new Logger("Migration");

const main = async () => {
  logger.log("Starting Migration");
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) throw new Error("DATABASE_URL is required");

  neonConfig.fetchConnectionCache = true;
  const sql = neon(connectionString);

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./.drizzle" });
};

main()
  .catch((error) => logger.error(error))
  .then(() => logger.log("Migration Complete"))
  .finally(() => process.exit(0));
