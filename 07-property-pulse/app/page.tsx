import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div>
        <h1 className="text-3xl">Welcome</h1>
        <Link href="/properties">Show properties</Link>
      </div>
    </main>
  );
}
