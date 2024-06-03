import { relations } from "drizzle-orm";
import {
  integer,
  json,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { comments } from "./comments";
import { communities } from "./communities";
import { users } from "./users";
import { votes } from "./votes";

const createTable = pgTableCreator((name) => `tribetie_${name}`);

export const posts = createTable("post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: json("content"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),

  communityId: integer("communityId")
    .notNull()
    .references(() => communities.id, { onDelete: "cascade" }),

  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export const postsRelations = relations(posts, ({ one, many }) => ({
  community: one(communities, {
    fields: [posts.communityId],
    references: [communities.id],
  }),

  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),

  comments: many(comments),

  votes: many(votes),
}));
