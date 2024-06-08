import React from "react";

import { desc, eq, inArray } from "drizzle-orm";

import { db } from "~/server/db";
import { posts as Posts, subscriptions } from "~/server/db/schema";
import { getCurrentUser } from "~/services/user";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "~/config";

import PostFeed from "./post-feed";

const CustomFeed = async () => {
  const currentUser = await getCurrentUser();

  const followedCommunities = await db.query.subscriptions.findMany({
    where: eq(subscriptions.userId, currentUser!.id),
    with: {
      community: true,
    },
  });

  const followedCommunitiesIds = followedCommunities.map(
    ({ community }) => community.id,
  );

  const posts = await db.query.posts.findMany({
    orderBy: [desc(Posts.createdAt)],
    where: inArray(Posts.communityId, followedCommunitiesIds),
    with: {
      author: true,
      community: true,
      votes: true,
      comments: true,
    },
    limit: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} currentUser={currentUser} />;
};

export default CustomFeed;
