import Link from "next/link";
import { getCurrentUser } from "~/services/user";

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-semibold">Welcome to TribeTie</h1>
      <p className="mt-3 text-sm">A place where connections become a tribe.</p>
      <div className="mt-8">
        {currentUser ? (
          <Link href="/assessment/1">Take assessment</Link>
        ) : (
          <p className="text-sm">Please sign in to continue.</p>
        )}
      </div>
    </div>
  );
}
