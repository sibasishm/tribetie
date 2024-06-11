"use client";

import React from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";

import type { SafeUser } from "~/lib/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu";
import UserAvatar from "~/components/user-avatar";

type UserAccountNavProps = {
  currentUser: SafeUser;
};

const UserAccountNav: React.FC<UserAccountNavProps> = ({ currentUser }) => {
  const Logout = async (e: Event) => {
    e.preventDefault();

    await signOut({
      callbackUrl: `${window.location.origin}/login`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="h-10 w-10" currentUser={currentUser} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-neutral text-neutral-content"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {currentUser.name && (
              <p className="font-medium">{currentUser.name}</p>
            )}
            {currentUser.email && (
              <p className="w-[200px] truncate text-sm text-zinc-200">
                {currentUser.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-400" />

        <DropdownMenuItem asChild>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/t/create">Create community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-400" />

        <DropdownMenuItem
          onSelect={(e) => void Logout(e)}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
