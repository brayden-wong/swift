import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const CompaniesTable = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
  },
  (table) => ({
    nameIndex: index("name_index").on(table.name),
  }),
);
