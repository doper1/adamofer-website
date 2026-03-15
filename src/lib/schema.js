import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  ipHash: varchar("ip_hash", { length: 255 }).notNull(),
  path: varchar("path", { length: 255 }).notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
