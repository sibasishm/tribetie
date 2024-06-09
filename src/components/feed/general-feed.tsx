import React from "react";

import { desc } from "drizzle-orm";

import { db } from "~/server/db";
import { posts as Posts } from "~/server/db/schema";
import { getCurrentUser } from "~/services/user";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "~/config";

import PostFeed from "./post-feed";

const GeneralFeed = async () => {
  const currentUser = await getCurrentUser();

  const posts = await db.query.posts.findMany({
    orderBy: [desc(Posts.createdAt)],
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

export default GeneralFeed;
