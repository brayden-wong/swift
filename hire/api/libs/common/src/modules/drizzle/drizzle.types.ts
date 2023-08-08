import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '@app/common/schema';

export type DrizzleConfig = {
  url: string;
  options: {
    schema: typeof schema;
    logger: boolean;
  };
};

export type Database = NeonHttpDatabase<typeof schema>;
