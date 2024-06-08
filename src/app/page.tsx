import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { getCurrentUser } from "~/services/user";
import GeneralFeed from "~/components/feed/general-feed";
import CustomFeed from "~/components/feed/custom-feed";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const HomePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
        {currentUser ? <CustomFeed /> : <GeneralFeed />}
        <div className="order-first h-fit overflow-hidden rounded-lg border border-gray-200 md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="flex items-center gap-1.5 py-3 font-semibold">
              <HomeIcon className="h-4 w-4" />
              Home
            </p>
          </div>
          <div className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            {currentUser ? (
              <>
                <div className="flex justify-between gap-x-4 pb-3">
                  <p className="text-zinc-500">
                    Know your personality and interests to find the right
                    communities for you.
                  </p>
                </div>
                <Link href="/assessment/1" className="btn btn-primary btn-block">
                  Take assessment
                </Link>
              </>
            ) : (
              <>
                <div className="flex justify-between gap-x-4 pb-3">
                  <p className="text-zinc-500">
                    Create community and find the right communities for you.
                  </p>
                </div>
                <Link href="/create" className="btn btn-block">
                  Create community
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
