"use server";

import { eq } from "drizzle-orm";
import { redis } from "~/lib/redis";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { getCurrentUser } from "~/services/user";

export async function createPersona(personaId: number) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("You must be signed in to create a persona");
  }

  try {
    const [user] = await db
      .update(users)
      .set({
        personaId,
      })
      .where(eq(users.id, currentUser.id))
      .returning();

    await redis.hset(`user:${currentUser.email}`, user!);
    await redis.expire(`user:${currentUser.email}`, 60 * 60 * 6);
  } catch (error) {
    throw new Error("Could not update persona, please try again");
  }
}
