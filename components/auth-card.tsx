"use client";

import { useState } from "react";
import Link from "next/link";

type Mode = "login" | "register";

const inputClasses =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15";

const labelClasses = "mb-1.5 block text-sm font-medium text-white/80";

export default function AuthCard({
  initialMode,
  initialUsername = "",
}: {
  initialMode: Mode;
  initialUsername?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [tos, setTos] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setError("");
    setDone(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setDone(false);

    if (mode === "register") {
      if (!username.trim() || !email.trim() || !password) {
        setError("Please fill in every field.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("That email doesn't look right.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirm) {
        setError("Passwords don't match.");
        return;
      }
      if (!tos) {
        setError("Please accept the Terms of Service.");
        return;
      }
    } else {
      if (!username.trim() || !password) {
        setError("Please enter your username and password.");
        return;
      }
    }

    setDone(true);
  }

  const isRegister = mode === "register";

  return (
    <>
      <div className="relative grid w-full grid-cols-2 rounded-full bg-white/10 p-1 ring-1 ring-white/10">
        <span
          className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-emerald-400/90 shadow-lg shadow-emerald-900/30 transition-transform duration-300 ease-out ${
            isRegister ? "translate-x-full" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors ${
            mode === "login"
              ? "text-emerald-950"
              : "text-white/70 hover:text-white"
          }`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => switchMode("register")}
          className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors ${
            isRegister
              ? "text-emerald-950"
              : "text-white/70 hover:text-white"
          }`}
        >
          Sign up
        </button>
      </div>

      <div key={mode} className="animate-fade-slide-in mt-6">
        <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-white">
          {isRegister ? "Create your page" : "Welcome back"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor={`${mode}-username`} className={labelClasses}>
              Username
            </label>
            <input
              id={`${mode}-username`}
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
              placeholder="@yourusername"
              autoComplete="username"
              className={inputClasses}
            />
          </div>

          {isRegister && (
            <div>
              <label htmlFor="register-email" className={labelClasses}>
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClasses}
              />
            </div>
          )}

          <div>
            <label htmlFor={`${mode}-password`} className={labelClasses}>
              Password
            </label>
            <input
              id={`${mode}-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={isRegister ? "new-password" : "current-password"}
              className={inputClasses}
            />
          </div>

          {isRegister && (
            <div>
              <label htmlFor="register-confirm" className={labelClasses}>
                Confirm password
              </label>
              <input
                id="register-confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClasses}
              />
            </div>
          )}

          {/* {isRegister && (
                <input
                  id="register-tos"
                  type="checkbox"
                  checked={tos}
                  onChange={(e) => setTos(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-green-600"
                />
                <label
                  htmlFor="register-tos"
                  className="text-sm text-white/60"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-emerald-400 underline hover:text-emerald-300"
                  >
                    Terms of Service
                  </Link>
                  .
                </label>
              </div>
            </div>
          )} */}

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}
          {done && (
            <p className="text-sm font-medium text-emerald-400">
              {isRegister
                ? "Account created! (DB not wired up yet)"
                : "Logged in! (DB not wired up yet)"}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-emerald-400 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300 active:scale-[0.99]"
          >
            {isRegister ? "Create account" : "Log in"}
          </button>
        </form>
      </div>
    </>
  );
}