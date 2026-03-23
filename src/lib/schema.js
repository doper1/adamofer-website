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

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }),
  color: varchar("color", { length: 100 }),
  badgeUrl: text("badge_url"),
  credentialUrl: text("credential_url"),
  displayOrder: integer("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skillGroups = pgTable("skill_groups", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 100 }),
  displayOrder: integer("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").references(() => skillGroups.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  link: text("link"),
  gradient: varchar("gradient", { length: 100 }),
  displayOrder: integer("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  tag: varchar("tag", { length: 100 }).notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  period: varchar("period", { length: 100 }),
  description: text("description"),
  displayOrder: integer("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experienceHighlights = pgTable("experience_highlights", {
  id: serial("id").primaryKey(),
  experienceId: integer("experience_id").references(() => experiences.id, { onDelete: "cascade" }),
  highlight: text("highlight").notNull(),
});

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: varchar("caption", { length: 255 }),
  category: varchar("category", { length: 100 }),
  displayOrder: integer("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteConfig = pgTable("site_config", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
