import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-3xl sm:text-7xl font-bold">Visit API</h1>

      <ul className="flex flex-col gap-4">
        <li>
          <Link className="text-blue-500 hover:underline" href="/api/v1/users">Get all Users</Link>
        </li>
        <li>
          <Link className="text-blue-500 hover:underline" href="/api/v1/users/1">Get User by Id 1</Link>
        </li>
      </ul>
    </main>
  );
}
