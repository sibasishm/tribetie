import type {
  Comment,
  CommentVote,
  Post,
  Community,
  User,
  Vote,
} from "~/server/db/schema";

export type SafeUser = Pick<User, "name" | "email" | "image">;

export type ExtendedPost = Post & {
  author: User;
  community: Community;
  votes: Vote[];
  comments: Comment[];
};

export type VoteType = "UP" | "DOWN";

export type PartialVote = Pick<Vote, "type">;

export type ExtendedComment = Comment & {
  author: User;
  votes: CommentVote[];
};

export type TResponse = {
  question_id: number;
  response: string;
};

export type TPersona = {
  persona_id: number;
  name: string;
  description: string;
  criteria: Record<string, string[]>;
};

export type TQuestion = {
  question_id: number;
  question: string;
  dimension: string;
};
