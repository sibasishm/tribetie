"use client";

import { useUser } from "@clerk/nextjs";
import { PERSONAS } from "~/lib/constants";

export default function WelcomePage() {
  const user = useUser();

  if (!user) {
    return <div>No user found!</div>;
  }

  const persona = PERSONAS.find(
    (p) => p.persona_id === user.user?.publicMetadata?.personaId,
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-bold">
        Welcome {user.user?.fullName}
      </h1>
      <p className="mt-12 text-center text-xl font-semibold">
        You are {persona?.name}!
      </p>
      <p className="mt-2 text-center text-xl font-light">
        We would like to describe you as a {persona?.description}.
      </p>
    </main>
  );
}
