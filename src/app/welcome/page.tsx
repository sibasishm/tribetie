import { PERSONAS } from "~/lib/constants";
import { getCurrentUser } from "~/services/user";

export default async function WelcomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>No user found!</div>;
  }

  const persona = PERSONAS.find((p) => p.persona_id === user.personaId);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-bold">Welcome {user.name}</h1>
      <p className="mt-12 text-center text-xl font-semibold">
        You are {persona?.name}!
      </p>
      <p className="mt-2 text-center text-xl font-light">
        We would like to describe you as a {persona?.description}.
      </p>
    </main>
  );
}
