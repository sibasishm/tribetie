import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-semibold">Welcome to TribeTie</h1>
      <p className="mt-3 text-sm">A place where connections become a tribe.</p>
      <div className="mt-8">
        <SignedIn>
          <Link href="/assessment/1">Take assessment</Link>
        </SignedIn>
        <SignedOut>
          <p className="text-sm">Please sign in to continue.</p>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
