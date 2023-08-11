import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Logger } from "@nestjs/common";
import { Client } from "pg";

import * as dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const logger = new Logger("Migration");

const main = async () => {
  logger.log("Starting Migration");
  const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl=true&options=project%3D${process.env.ENDPOINT_ID}`;

  if (!connectionString) throw new Error("DATABASE_URL is required");

  const client = new Client(connectionString);

  await client.connect();

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "./.drizzle" });
};

main()
  .catch((error) => logger.error(error))
  .then(() => logger.log("Migration Complete"))
  .finally(() => process.exit(0));
