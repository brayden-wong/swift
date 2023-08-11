import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@app/common/schemas";

export type DrizzleConfig = {
  url: string;
  options: {
    schema: typeof schema;
    logger: boolean;
  };
};

export type Database = NodePgDatabase<typeof schema>;
