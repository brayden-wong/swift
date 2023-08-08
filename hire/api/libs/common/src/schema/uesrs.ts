import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
});
