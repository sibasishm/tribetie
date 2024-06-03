import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

import { communities } from "./communities";
import { users } from "./users";

export const subscriptions = pgTable(
  "subscription",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    communityId: integer("communityId")
      .notNull()
      .references(() => communities.id),
  },
  (subscription) => ({
    compoundKey: primaryKey({
      columns: [subscription.userId, subscription.communityId],
    }),
  }),
);

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  community: one(communities, {
    fields: [subscriptions.communityId],
    references: [communities.id],
  }),
}));
