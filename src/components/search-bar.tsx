"use client";

import { useCallback, useEffect, useRef, useState } from "react";
// import { Prisma, Subreddit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import debounce from "lodash.debounce";
import { usePathname } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  // CommandItem,
  CommandList,
} from "./command";
import { useOnClickOutside } from "~/hooks/use-on-click-outside";
// import { Users } from "lucide-react";

const SearchBar = ({}) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    void refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    void request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const data = await ky.get(`/api/search?q=${input}`).json();
      return data as [];
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
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {/* {queryResults?.map((subreddit) => (
                <p key={subreddit.id}>{subreddit.name}</p>
                // <CommandItem
                //   onSelect={(e) => {
                //     router.push(`/r/${e}`);
                //     router.refresh();
                //   }}
                //   key={subreddit.id}
                //   value={subreddit.name}
                // >
                //   <Users className="mr-2 h-4 w-4" />
                //   <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                // </CommandItem>
              ))} */}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
