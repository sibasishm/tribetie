import { useUser } from "@clerk/nextjs";

export default function WelcomePage() {
  const user = useUser();

  if (!user) {
    return <div>No user found!</div>;
  }

  console.log(user);
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-bold">
        Welcome {user.user?.fullName}
      </h1>
      <p className="mt-12 text-center text-xl font-semibold">
        You can now start answering questions!
      </p>
    </main>
  );
}
