import type { InferModel } from "drizzle-orm";
import { UsersTable } from "@app/common/schemas";

export type User = InferModel<typeof UsersTable, "select">;
export type UpdateUserDto = Partial<InferModel<typeof UsersTable, "insert">>;
