import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { users } from "./users";

export const voteType = pgEnum("type", ["UP", "DOWN"]);

const createTable = pgTableCreator((name) => `tribetie_${name}`);

export const votes = createTable(
  "vote",
  {
    type: voteType("type"),

    authorId: text("authorId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    postId: integer("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  },
  (vote) => ({
    compoundKey: primaryKey({ columns: [vote.authorId, vote.postId] }),
  }),
);

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;

export const votesRelations = relations(votes, ({ one }) => ({
  author: one(users, {
    fields: [votes.authorId],
    references: [users.id],
  }),

  post: one(posts, {
    fields: [votes.postId],
    references: [posts.id],
  }),
}));
