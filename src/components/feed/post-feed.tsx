"use client";

import React, { useEffect, useRef } from "react";

import { useIntersection } from "~/hooks/use-intersection";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { Loader2 } from "lucide-react";

import type { User } from "~/server/db/schema";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "~/config";
import type { ExtendedPost } from "~/lib/types";

import Post from "../post/post-card";

type PostFeedProps = {
  initialPosts: ExtendedPost[];
  communityName?: string;
  currentUser: User | null | undefined;
};

const PostFeed: React.FC<PostFeedProps> = ({
  initialPosts,
  communityName,
  currentUser,
}) => {
  const lastPostRef = useRef<HTMLLIElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["Posts"],
    queryFn: ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (communityName ? `&communityName=${communityName}` : "");

      return ky.get(query).json<ExtendedPost[]>();
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialPosts],
      pageParams: [1],
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="col-span-2 flex flex-col space-y-6">
      {posts.map((post, index) => {
        const communityName = post.community.name;
        const commentAmount = post.comments.length;

        const voteAmount = post.votes.reduce((total, vote) => {
          if (vote.type === "UP") return total + 1;
          else if (vote.type === "DOWN") return total - 1;
          return total;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.authorId === currentUser?.id,
        );

        return index === posts.length - 1 ? (
          <li key={post.id} ref={ref}>
            <Post
              currentVote={currentVote}
              voteAmount={voteAmount}
              post={post}
              communityName={communityName}
              commentAmount={commentAmount}
            />
          </li>
        ) : (
          <li key={post.id}>
            <Post
              currentVote={currentVote}
              voteAmount={voteAmount}
              post={post}
              communityName={communityName}
              commentAmount={commentAmount}
            />
          </li>
        );
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
