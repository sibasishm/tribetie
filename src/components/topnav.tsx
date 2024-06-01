import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Link href="/" aria-label="Home">
            <h1 className="font-serif text-3xl font-bold text-violet-400">
              TribeTie
            </h1>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Profile
            </a>
          </div>
        </div>
      </div>
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
    </nav>
  );
}
