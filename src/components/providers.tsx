"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>{children}</ClerkProvider>
    </QueryClientProvider>
  );
};

export default Providers;
