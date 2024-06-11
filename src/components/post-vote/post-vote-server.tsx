import React from "react";
import { notFound } from "next/navigation";

import type { Post, Vote } from "~/server/db/schema";
import { getCurrentUser } from "~/services/user";
import type { VoteType } from "~/lib/types";

import PostVoteClient from "./post-vote";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";

type PostVoteServerProps = {
  postId: number;
  initialVote?: VoteType | null;
  initialVoteAmount?: number;
  getData?: () => Promise<
    | (Post & {
        votes: Vote[];
      })
    | undefined
  >;
};

export const PostVoteServer: React.FC<PostVoteServerProps> = async ({
  postId,
  initialVote,
  initialVoteAmount,
  getData,
}) => {
  const currentUser = await getCurrentUser();

  let _voteAmount = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getData) {
    const post = await getData();

    if (!post) return notFound();

    _voteAmount = post.votes.reduce((total, vote) => {
      if (vote.type === "UP") return total + 1;
      else if (vote.type === "DOWN") return total - 1;
      return total;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.authorId === currentUser?.id,
    )?.type;
  } else {
    _voteAmount = initialVoteAmount ?? 0;
    _currentVote = initialVote;
  }
  return (
    <PostVoteClient
      postId={postId}
      initialVote={_currentVote}
      initialVoteAmount={_voteAmount}
    />
  );
};

export const PostVoteShell = () => {
  return (
    <div className="flex w-20 flex-col items-center pr-6">
      <div className="btn btn-ghost btn-sm">
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>
      <div className="py-2 text-center text-sm font-medium text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
      <div className="btn btn-ghost btn-sm">
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
};
