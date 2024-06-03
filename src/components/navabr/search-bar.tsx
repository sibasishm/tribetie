"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import type { Community } from "~/server/db/schema";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { useOnClickOutside } from "~/hooks/use-on-click-outside";
import { Users } from "lucide-react";
import { cn } from "~/lib/utils";
import { Skeleton } from "../skeleton";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    await refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    void request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const data = await ky.get(`/api/search?q=${input}`).json<Community[]>();
      return data;
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search communities..."
      />

      {input.length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          <CommandEmpty
            className={cn(isFetching ? "hidden" : "py-6 text-center text-sm")}
          >
            No communities found.
          </CommandEmpty>
          {isFetching ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            (queryResults?.length ?? 0) > 0 && (
              <CommandGroup heading="Communities">
                {queryResults?.map((subreddit) => (
                  <CommandItem
                    key={subreddit.id}
                    value={subreddit.name}
                    onSelect={(e) => {
                      router.push(`/r/${e}`);
                      router.refresh();
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
