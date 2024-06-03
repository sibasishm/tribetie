import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/server/db";
import { env } from "~/env.js";
// import { accounts, users } from "~/server/db/schema";

const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect() {
      return "/";
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};

export default authOptions;
