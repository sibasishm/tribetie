"use serevr";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function createPersona(personaId: number) {
  console.log("Creating persona", personaId);
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to create a persona");
  }
  await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      personaId,
    },
  });
}
