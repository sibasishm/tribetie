// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `tribetie_${name}`);

export const communities = createTable("community", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const communityRelations = relations(communities, ({ many }) => ({
  posts: many(posts, { relationName: "posts" }),
}));

export const posts = createTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  userId: varchar("userId", { length: 256 }).notNull(),
  communityId: integer("community_id")
    .references(() => communities.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const postRelations = relations(posts, ({ one }) => ({
  posts: one(communities, {
    fields: [posts.communityId],
    references: [communities.id],
    relationName: "posts",
  }),
}));
