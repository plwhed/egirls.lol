import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-white/15 bg-white/10 py-2 pl-5 pr-2 shadow-lg backdrop-blur-md">
        <Link
          href="/"
          className="font-semibold tracking-tight text-white"
        >
          <span className="text-emerald-300">egirls</span>.lol
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/register"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/register?mode=register"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-300"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}