import Link from "next/link";

export default function Home() {
  return (
    <nav className="flex space-x-4">
      <Link href="/">Home</Link>
      <a href="/login">Login</a>
      <Link href="/register">Register</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
