import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans text-white">
      <p className="text-6xl font-bold tracking-tight text-white/20">404</p>
      <p className="mt-3 text-sm text-white/50">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-emerald-400 px-5 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-300"
      >
        Go home
      </Link>
    </div>
  );
}
