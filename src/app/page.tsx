import { db } from "~/server/db";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="font-serif text-4xl font-semibold">Welcome to TribeTie</h1>
      <p className="mt-3 text-sm">A place where connections become a tribe.</p>
      <div className="mt-6">
        {posts.map((post) => (
          <ol
            key={post.id}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4"
          >
            <li className="text-lg font-semibold">{post.name}</li>
          </ol>
        ))}
      </div>
    </main>
  );
}
