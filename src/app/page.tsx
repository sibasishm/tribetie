import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="font-serif text-4xl font-semibold">Welcome to TribeTie</h1>
      <p className="mt-3 text-sm">A place where connections become a tribe.</p>
    </main>
  );
}
