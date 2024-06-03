import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { commentVotes } from "./commentVotes";
import { posts } from "./posts";
import { communities } from "./communities";
import { subscriptions } from "./subscriptions";
import { votes } from "./votes";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  username: text("username").unique(),
  personaId: integer("persona_id"),
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
