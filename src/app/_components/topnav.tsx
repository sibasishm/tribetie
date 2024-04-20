import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { VscBellDot } from "react-icons/vsc";

export default function TopNav() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <h1 className="font-serif text-3xl font-bold text-violet-400">
            TribeTie
          </h1>
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
      <form className="ml-4 flex flex-1 items-center">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full max-w-64 text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
          />
        </div>
      </form>
      <div className="text-xl font-semibold text-slate-800">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton />
            <button
              type="button"
              className="flex-shrink-0 rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <VscBellDot className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
