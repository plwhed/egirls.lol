import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/auth-card";
import LandingBackground from "@/components/landing-background";

export const metadata: Metadata = {
  title: "egirls.lol — log in or sign up",
};

function modeFrom(value: string | string[] | undefined): "login" | "register" {
  return value === "register" ? "register" : "login";
}

export default async function RegisterPage(
  props: PageProps<"/register">
) {
  const { username, mode } = await props.searchParams;

  return (
    <LandingBackground>
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 font-sans">
        <Link
          href="/"
          className="absolute left-6 top-6 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold tracking-tight text-white backdrop-blur-md"
        >
          <span className="text-emerald-400">egirls</span>.lol
        </Link>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/40">
          <AuthCard
            initialMode={username ? "register" : modeFrom(mode)}
            initialUsername={typeof username === "string" ? username : ""}
          />
        </div>
      </div>
    </LandingBackground>
  );
}
