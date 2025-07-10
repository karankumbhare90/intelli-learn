
import { integer, pgTable, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    profileImage: varchar({ length: 255 }),
    subscriptionId: varchar()
});

export const coursesTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar().notNull(),
    name: varchar().notNull(),
    description: varchar(),
    noOfChapters: integer().notNull(),
    includeVideo: boolean().default(false),
    level: varchar().notNull(),
    category: varchar(),
    courseJSON: json(),
    userEmail: varchar('userEmail').references(() => usersTable.email),
})