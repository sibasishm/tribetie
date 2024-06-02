import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import SearchBar from "./search-bar";

export default function TopNav() {
  return (
    <nav className="h-fit border-b border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4">
        <div className="flex-shrink-0">
          <Link href="/" aria-label="Home">
            <h1 className="font-serif text-3xl font-bold text-violet-400">
              TribeTie
            </h1>
          </Link>
        </div>
        <SearchBar />
        <div className="text-xl font-semibold text-slate-800">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
