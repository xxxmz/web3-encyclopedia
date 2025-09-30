import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const terms = pgTable("terms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  brief: text("brief").notNull(),
  definition: text("definition").notNull(),
  background: text("background").notNull(),
  applications: text("applications").notNull(),
  category: text("category").notNull(),
  clicks: integer("clicks").notNull().default(0),
});

export const insertTermSchema = createInsertSchema(terms).omit({
  id: true,
  clicks: true,
});

export type InsertTerm = z.infer<typeof insertTermSchema>;
export type Term = typeof terms.$inferSelect;
