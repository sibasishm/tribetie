import { relations } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { subscriptions } from "./subscriptions";
import { users } from "./users";

const createTable = pgTableCreator((name) => `tribetie_${name}`);

export const communities = createTable(
  "community",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt"),

    creatorId: text("creatorId").references(() => users.id),
  },
  (community) => ({
    nameIdx: index("name_idx").on(community.name),
  }),
);

export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;

export const communitiesRelations = relations(communities, ({ one, many }) => ({
  creator: one(users, {
    fields: [communities.creatorId],
    references: [users.id],
    relationName: "CreatedBy",
  }),

  posts: many(posts),

  subscribers: many(subscriptions),
}));
