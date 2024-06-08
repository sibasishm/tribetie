"use client";

import React, { useRef } from "react";

import { MessageSquare } from "lucide-react";

import type { Post, User, Vote } from "~/server/db/schema";
import { formatTimeToNow } from "~/lib/utils";
import type { PartialVote } from "~/lib/types";

import EditorOutput from "../editor/editor-output";
// import PostVoteClient from "../post-vote/PostVoteClient";

type PostProps = {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  communityName: string;
  commentAmount: number;
  voteAmount: number;
  currentVote?: PartialVote;
};

const Post: React.FC<PostProps> = ({
  post,
  communityName,
  commentAmount,
  // voteAmount,
  // currentVote,
}) => {
  const postRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-6 py-4">
        {/* <PostVoteClient
          postId={post.id}
          initialVote={currentVote?.type}
          initialVoteAmount={voteAmount}
        /> */}
        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            {communityName && (
              <>
                <a
                  className="text-sm text-zinc-900 underline underline-offset-2"
                  href={`/r/${communityName}`}
                >
                  r/{communityName}
                </a>
                <span className="px-1">•</span>
              </>
            )}
            <span>Posted by u/{post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt!))}
          </div>

          <a href={`/r/${communityName}/post/${post.id}`}>
            <h3 className="py-2 text-lg font-semibold leading-6 text-gray-900">
              {post.title}
            </h3>
          </a>

          <div
            className="relative max-h-40 w-full overflow-clip text-sm"
            ref={postRef}
          >
            {/* <EditorOutput content={post.content} /> */}
            {postRef.current?.clientHeight === 160 && (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
        </div>
      </div>

      <div className="z-20 bg-gray-50 p-4 text-sm sm:px-6">
        <a
          href={`/r/${communityName}/post/${post.id}`}
          className="flex w-fit items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmount} comments
        </a>
      </div>
    </div>
  );
};

export default Post;
