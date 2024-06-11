"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

import { cn } from "~/lib/utils";
import type { PostVoteRequest } from "~/lib/validators/vote";
import { useAuthToasts } from "~/hooks/use-auth-toats";
import { toast } from "~/hooks/use-toast";
import { usePrevious } from "~/hooks/use-previous";
import type { VoteType } from "~/lib/types";

type PostVoteClientProps = {
  postId: number;
  initialVoteAmount: number;
  initialVote?: VoteType | null;
};

const PostVoteClient: React.FC<PostVoteClientProps> = ({
  postId,
  initialVoteAmount,
  initialVote,
}) => {
  const { loginToast } = useAuthToasts();

  const [voteAmount, setVoteAmount] = useState(initialVoteAmount);

  const [currentVote, setCurrentVote] = useState(initialVote);
  const previousVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType: type,
      };

      const data = await ky.patch("/api/community/post/vote", {
        json: payload,
      });

      return data;
    },
    onError(error, voteType) {
      if (voteType === "UP") setVoteAmount((prev) => prev - 1);
      else if (voteType === "DOWN") setVoteAmount((prev) => prev + 1);

      setCurrentVote(previousVote);

      if (error instanceof HTTPError && error.response?.status === 401) {
        return loginToast();
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);

        if (type === "UP") setVoteAmount((prev) => prev - 1);
        else if (type === "DOWN") setVoteAmount((prev) => prev + 1);
      } else {
        setCurrentVote(type);

        if (type === "UP")
          setVoteAmount((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVoteAmount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-col pb-4 pr-6 sm:w-20 sm:pb-4">
      <button
        onClick={() => void vote("UP")}
        className="btn btn-ghost btn-sm"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-neutral-content hover:text-success", {
            "fill-success text-success": currentVote === "UP",
          })}
        />
      </button>

      <p className="py-2 text-center text-sm font-bold text-neutral-content">
        {voteAmount}
      </p>

      <button
        onClick={() => void vote("DOWN")}
        className="btn btn-ghost btn-sm"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-neutral-content hover:text-error", {
            "fill-error text-error": currentVote === "DOWN",
          })}
        />
      </button>
    </div>
  );
};

export default PostVoteClient;
