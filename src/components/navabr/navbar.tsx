import Link from "next/link";

import { getCurrentUser } from "~/services/user";

import { Icons } from "../icons";
import SearchBar from "./search-bar";
import UserAccountNav from "./user-account-nav";

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <nav className="fixed inset-x-0 top-0 z-10 h-fit border-b border-zinc-600 bg-neutral py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-9 w-9 sm:h-8 sm:w-8" />
          <Icons.reddit className="hidden h-[18px] sm:block" />
        </Link>

        <SearchBar />

        {currentUser ? (
          <UserAccountNav currentUser={currentUser} />
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
