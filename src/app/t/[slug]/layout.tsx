import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { and, eq, sql } from "drizzle-orm";

import { db } from "~/server/db";
import { communities, subscriptions } from "~/server/db/schema";
import { getCurrentUser } from "~/services/user";
import SubscribeLeaveToggle from "~/components/subscribe-button";
import ToFeedButton from "~/components/feed-back-button";

type CommunityLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const CommunityLayout: React.FC<CommunityLayoutProps> = async ({
  children,
  params,
}) => {
  const currentUser = await getCurrentUser();

  const { slug } = params;
  const community = await db.query.communities.findFirst({
    where: eq(communities.name, slug),
    with: {
      posts: {
        with: {
          author: true,
          votes: true,
        },
      },
    },
  });

  if (!community) return notFound();

  const subscription = currentUser
    ? await db.query.subscriptions.findFirst({
        where: and(
          eq(subscriptions.communityId, community.id),
          eq(subscriptions.userId, currentUser.id),
        ),
      })
    : undefined;

  const isSubscribed = !!subscription;

  const [memberCount] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(subscriptions)
    .where(eq(subscriptions.communityId, community.id));

  return (
    <div className="mx-auto h-full max-w-7xl sm:container sm:pt-12">
      <ToFeedButton />

      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-2 flex flex-col space-y-6">{children}</div>

        {/* Info sidebar */}
        <div className="order-first hidden h-fit overflow-hidden rounded-lg border border-gray-500 md:order-last md:block">
          <div className="px-6 py-4">
            <p className="py-3 font-semibold">About t/{community?.name}</p>
          </div>

          <dl className="bg-base-100 px-6 pb-4 text-sm leading-6">
            <div className="mb-4 divide-y divide-gray-500">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-300">Created</dt>
                <dd className="text-gray-300">
                  <time dateTime={community.createdAt?.toDateString()}>
                    {format(community.createdAt!, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-300">Members</dt>
                <dd className="text-gray-300">{memberCount?.count ?? 0}</dd>
              </div>
            </div>

            {community.creatorId === currentUser?.id ? (
              <div className="flex justify-between gap-x-4 py-3">
                <p className="text-gray-500">You created this community</p>
              </div>
            ) : (
              <SubscribeLeaveToggle
                communityId={community.id}
                communityName={community.name}
                isSubscribed={isSubscribed}
              />
            )}

            <Link
              href={`/t/${slug}/submit`}
              className="btn btn-primary btn-block"
            >
              Create post
            </Link>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CommunityLayout;
