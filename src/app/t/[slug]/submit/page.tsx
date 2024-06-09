import React from "react";
import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { communities } from "~/server/db/schema";
import Editor from "~/components/editor/editor";

type SubmitPostPageProps = {
  params: {
    slug: string;
  };
};

const SubmitPostPage: React.FC<SubmitPostPageProps> = async ({ params }) => {
  const { slug } = params;

  const community = await db.query.communities.findFirst({
    where: eq(communities.name, slug),
  });

  if (!community) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-400 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg font-semibold leading-6 text-base-content">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-base text-gray-300">
            in t/{slug}
          </p>
        </div>
      </div>

      {/* Form */}
      <Editor communityId={community.id} />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          form="community-form-post"
        >
          Post
        </button>
      </div>
    </div>
  );
};
export default SubmitPostPage;
