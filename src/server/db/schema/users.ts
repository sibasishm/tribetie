import { relations } from "drizzle-orm";
import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

import { commentVotes } from "./commentVotes";
import { posts } from "./posts";
import { communities } from "./communities";
import { subscriptions } from "./subscriptions";
import { votes } from "./votes";

const createTable = pgTableCreator((name) => `tribetie_${name}`);

export const users = createTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  username: text("username").unique(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ many }) => ({
  createdCommunities: many(communities, {
    relationName: "CreatedBy",
  }),

  posts: many(posts),

  votes: many(votes),

  commentVotes: many(commentVotes),

  subscriptions: many(subscriptions),
}));
